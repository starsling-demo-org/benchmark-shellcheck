/**
 * Evidence extractor for koalaman/shellcheck CI (build.yml).
 *
 * Checks that make up "same checks, same results":
 *  - the QuickCheck test suite, run once per GHC version (`Run tests (GHC x)`): one unit per property
 *    (`ghc-<v>:<prop>`, passed on `+++ OK`, failed on `*** Failed!` / `*** Gave up!` or when it never reports) and
 *    one for the suite verdict (`ghc-<v>:suite`);
 *  - the release binary of each build target (`Build (<target>)`): produced and stripped, smoke-tested with
 *    `--version` where the builder can run it (not darwin), and uploaded as `<target>.bin`;
 *  - the source package and the final packaging (a tar.gz and tar.xz per target, the zip, the man page).
 *
 * Only outcomes are read, never cache, download or compile lines, so the logs of the pin and of the armv6hf
 * incremental-build lever (a restored `dist-newstyle`, `cp` instead of `mv`, fewer modules compiled) yield the same
 * units. Test-run counts ("passed 1 test" vs "passed 100 tests") are not part of a verdict. Binary sizes are printed
 * in the logs but differ by build id between builds, so they are exposed by `binarySizes` and not used as evidence.
 * The `deploy` job is skipped on pull requests (its own `if:`) and is not part of the evidence.
 */
import type { EvidenceExtractor, EvidenceJob } from '../src/evidence-collect.ts'
import type { TestCaseVerdictRecord } from '../src/parity.ts'

export const GHC_VERSIONS = ['8.0', '8.10', '9.0.1', '9.4.7', '9.6.6', 'latest'] as const
export const TARGETS = [
  'linux.x86_64',
  'linux.aarch64',
  'linux.armv6hf',
  'linux.riscv64',
  'darwin.x86_64',
  'darwin.aarch64',
  'windows.x86_64',
] as const
/** Targets whose builder runs the new binary (qemu, wine or native); the darwin builds are cross-compiled only. */
const SMOKE = TARGETS.filter((t) => !t.startsWith('darwin'))

type Unit = { ok: boolean }

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** `=== prop_x from file:line ===` followed by the result line of that property. */
export function parseProperties(log: string): { prop: string; passed: boolean }[] {
  const props: { prop: string; passed: boolean }[] = []
  let current: { prop: string; passed: boolean } | undefined
  const seen = new Map<string, number>()
  for (const line of log.split('\n')) {
    const header = /^=== (\S+) from (\S+?):\d+ ===$/.exec(line)
    if (header) {
      // Line numbers move with unrelated edits; the file and name identify the property.
      const base = `${header[1]}@${header[2]}`
      const n = (seen.get(base) ?? 0) + 1
      seen.set(base, n)
      current = { prop: n === 1 ? base : `${base}#${n}`, passed: false }
      props.push(current)
      continue
    }
    if (!current) continue
    if (/^\+\+\+ OK, passed \d+ tests?\.?$/.test(line)) {
      current.passed = true
      current = undefined
    } else if (/^\*\*\* (Failed|Gave up)/.test(line)) {
      current = undefined
    }
  }
  return props
}

export function suitePassed(log: string): boolean {
  const summary = /^(\d+) of (\d+) test suites \((\d+) of (\d+) test cases\) passed\.$/m.exec(log)
  return (
    /^Test suite \S+: PASS$/m.test(log) &&
    !!summary &&
    summary[1] === summary[2] &&
    summary[3] === summary[4] &&
    !/^Test suite \S+: FAIL$/m.test(log)
  )
}

/**
 * Size (bytes) of the final binary: the last `ls -l <target>` line the builder printed (after stripping; the aarch64
 * darwin builder does not strip, so its two listings are equal).
 */
export function binarySizes(log: string): number | undefined {
  const sizes = [...log.matchAll(/^-rwx\S*\s+\d+\s+\S+\s+\S+\s+(\d+)\s.*\sshellcheck(?:\.exe)?$/gm)].map((m) => Number(m[1]))
  return sizes.at(-1)
}

const uploaded = (log: string, name: string) =>
  new RegExp(`^Artifact ${escape(name)} has been successfully uploaded!`, 'm').test(log)

function buildUnits(target: string, log: string): Record<string, Unit> {
  const units: Record<string, Unit> = {
    [`build:${target}:binary`]: { ok: binarySizes(log) !== undefined },
    [`build:${target}:artifact`]: { ok: uploaded(log, `${target}.bin`) },
  }
  if ((SMOKE as readonly string[]).includes(target))
    units[`build:${target}:smoke`] = { ok: /^version: v\d/m.test(log) && /^ShellCheck - shell script analysis tool$/m.test(log) }
  return units
}

function packageUnits(log: string): Record<string, Unit> {
  const listed = new Set(
    log
      .split('\n')
      .filter((l) => /^-rw/.test(l))
      .map((l) => l.trim().split(/\s+/).pop() ?? ''),
  )
  const has = (re: RegExp) => [...listed].some((f) => re.test(f))
  const units: Record<string, Unit> = {
    'package:zip': { ok: has(/^shellcheck-.+\.zip$/) },
    'package:manpage': { ok: listed.has('shellcheck.1') },
    'package:artifact:deploy': { ok: uploaded(log, 'deploy') },
  }
  // The windows build ships only inside the zip (checked above); every other target also gets a tar.gz and tar.xz.
  for (const t of TARGETS.filter((t) => !t.startsWith('windows')))
    units[`package:${t}`] = {
      ok:
        has(new RegExp(`^shellcheck-.+\\.${escape(t)}\\.tar\\.gz$`)) && has(new RegExp(`^shellcheck-.+\\.${escape(t)}\\.tar\\.xz$`)),
    }
  return units
}

const extract: EvidenceExtractor = ({ jobs }) => {
  const byName = (name: string) => jobs.find((j: EvidenceJob) => j.jobName === name)
  const results: [string, boolean, boolean][] = [] // [testId, ok, jobSucceeded]
  const add = (job: EvidenceJob | undefined, units: Record<string, Unit>) => {
    for (const [id, u] of Object.entries(units)) results.push([id, u.ok, job?.conclusion === 'success'])
  }

  add(byName('Package Source Code'), {
    'source:package': { ok: /^Artifact source has been successfully uploaded!/m.test(byName('Package Source Code')?.log ?? '') },
  })
  for (const v of GHC_VERSIONS) {
    const job = byName(`Run tests (GHC ${v})`)
    const log = job?.log ?? ''
    const props = Object.fromEntries(parseProperties(log).map((p) => [`ghc-${v}:${p.prop}`, { ok: p.passed }]))
    add(job, { ...props, [`ghc-${v}:suite`]: { ok: suitePassed(log) } })
  }
  for (const t of TARGETS) {
    const job = byName(`Build (${t})`)
    add(job, buildUnits(t, job?.log ?? ''))
  }
  add(byName('Package Binaries'), packageUnits(byName('Package Binaries')?.log ?? ''))

  const tests: TestCaseVerdictRecord[] = results
    .map(([testId, ok, jobOk]): TestCaseVerdictRecord => ({
      testId,
      verdict: ok && jobOk ? 'passed' : 'failed',
      mode: 'executed',
    }))
    .sort((a, b) => a.testId.localeCompare(b.testId))
  const passed = new Set(tests.filter((t) => t.verdict === 'passed').map((t) => t.testId))
  const allPassed = (prefix: string) => {
    const mine = tests.filter((t) => t.testId.startsWith(prefix))
    return mine.length > 0 && mine.every((t) => passed.has(t.testId))
  }
  const obligations = [
    ...GHC_VERSIONS.filter((v) => allPassed(`ghc-${v}:`)).map((v) => `test-suite:ghc-${v}`),
    ...TARGETS.filter(
      (t) => allPassed(`build:${t}:`) && (passed.has(`package:${t}`) || (t.startsWith('windows') && passed.has('package:zip'))),
    ).map((t) => `release-binary:${t}`),
    ...(allPassed('package:') ? ['release-package'] : []),
  ]
  return {
    tests,
    coverage: { scope: tests.map((t) => t.testId), covered: [...passed].sort() },
    obligations: obligations.sort(),
    commands: ['cabal test', 'cabal sdist', ...TARGETS.map((t) => `builders/run_builder builders/${t}`)].sort(),
  }
}

export default extract
