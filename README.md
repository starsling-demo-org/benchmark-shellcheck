# ShellCheck CI: GitHub-hosted runners vs StarSling Runners (with agents)

_Not affiliated with [koalaman/shellcheck](https://github.com/koalaman/shellcheck) (40.3k stars)._

ShellCheck's own CI workflows, replayed for a real upstream merge to its default branch on GitHub-hosted runners and on StarSling Runners (with agents). Every number comes from this repository's replays; upstream's own runs are linked for comparison.

StarSling Runners (with agents) = StarSling runners + StarSling agent PRs.

## Results

**Warm cache:** every sample starts from caches a seed run produced on the same runner configuration; seed time is not counted.

| Runner configuration | Merge CI duration<br><sub>Merge to the default branch</sub> | Runner time<br><sub>Merge to the default branch</sub> |
|---|---:|---:|
| **GitHub-hosted runners** | 34.50 min | 102.73 min |
| **StarSling Runners (with agents)** | 6.32 min<br>**5.5× faster** | 48.72 min<br>**2.1× less** |

**Cold cache:** every sample starts with no GitHub Actions caches.

| Runner configuration | Merge CI duration<br><sub>Merge to the default branch</sub> | Runner time<br><sub>Merge to the default branch</sub> |
|---|---:|---:|
| **GitHub-hosted runners** | 33.65 min | 100.93 min |
| **StarSling Runners (with agents)** | 21.53 min<br>**1.6× faster** | 65.53 min<br>**1.5× less** |

- On StarSling Runners (with agents), every check for a merge to the default branch finished in **6.32 min** instead of 34.50 min warm (**5.5× faster**), using 48.72 min instead of 102.73 min of runner time (**2.1× less**). Cold: **21.53 min** instead of 33.65 min (**1.6× faster**), using 65.53 min instead of 100.93 min of runner time (**1.5× less**).
- **Why warm and cold differ:** StarSling's agent PR is a cache fix: it keeps the slowest build's compiled output between runs, so its gain shows on warm runs. A cold run has nothing to restore.
- **PR updates:** not measured. Upstream's `build.yml` also runs on pull requests, but no upstream pull request was pinned for replay, so only the merge to the default branch was measured.
- **Context, not the headline** (upstream's own runs; not like-for-like with the numbers above): What upstream sees today: a median 34.8 min per merge to the default branch on upstream's own GitHub runners (n=12, most recent comparable merges to the default branch within the last 60 days; standard runners, warm caches, many commits; not a like-for-like replay).

<sub>Medians over complete rounds.</sub>

## Runners

| Runners | Label | vCPU | Memory |
|---|---|---:|---:|
| GitHub-hosted | `ubuntu-26.04-4core` | 4 | 16 GiB |
| StarSling | `starsling-ubuntu-26.04` | 4 | 16 GiB |

Runner time compared at these machine sizes: GitHub 4 vCPU vs StarSling 4 vCPU. StarSling's 4 vCPU runners can burst to 5 vCPU and 32 GB RAM (Afterburner); GitHub's 4-core runners have 16 GB.

GitHub-hosted jobs run on the explicit GitHub larger-runner label shown, pinned to the size of upstream's public-repository runner, so the comparison does not change with this repository's visibility.

## Claim checklist

- [x] **Same CI as upstream:** replays run the same workflows and jobs as upstream's own runs, with the same conclusions, except the `Deploy binaries` job, which is switched off because it publishes releases and images (see Method)
- [x] **Same checks, same results:** the same 14 checks ran and passed in every counted sample, warm and cold
- [x] **Cache state verified** for every sample
- [x] **Both runner configurations measured**, warm and cold
- [x] **All requested samples finished** (20 of 20; 3 samples were replaced and re-run, see Method)
- [x] **At least 5 rounds** (5 requested, warm and cold)
- [x] **No interference:** no other workflow run overlapped a sample
- [x] **Cost neutral:** the agent PR adds no parallel jobs that spend the freed runner time

### Same CI as upstream

- **Merge to the default branch:** same workflow and jobs as upstream's own run for the same commit ([#42545866428](https://github.com/koalaman/shellcheck/actions/runs/42545866428)), same conclusions. The one difference, identical in every configuration, is the `Deploy binaries` job: upstream ran it (GitHub release upload, Docker Hub push and a 300-second sleep); here it is switched off, so that upstream work is not in any column; see Method.

### Same checks, same results

Every counted sample's results were read from its own job logs. In all 20 counted samples (10 warm, 10 cold) the same 14 checks ran and passed: the test suite under each of six GHC versions (8.0, 8.10, 9.0.1, 9.4.7, 9.6.6 and latest), the release binary for each of seven targets (linux x86_64, aarch64, armv6hf and riscv64, darwin x86_64 and aarch64, windows x86_64), and the release package. Each test suite ran the same 2438 QuickCheck properties, all passing, in every sample; the source package, every binary, its upload and (except the two darwin binaries, which are cross-built and cannot run here) its `--version` smoke check, and every package were present in every sample. The binaries were not compared byte for byte: with the agent PR the `linux.armv6hf` binary is built incrementally, so its build id, version stamp and a few hundred bytes of address fields differ from a clean build.

## Terms

| Term | Meaning |
|---|---|
| **PR CI duration** | Elapsed time from the first workflow starting to the last job finishing, across every workflow one PR update starts (including `workflow_run` follow-ups). |
| **Merge CI duration** | The same, for every workflow one merge to the default branch starts. |
| **Runner time** | Total machine time all jobs used for one event, summed across jobs; billed per second. Jobs kept on GitHub-hosted runners still count. |
| **StarSling Runners (with agents)** | StarSling runners plus StarSling agent PRs: the project's CI with StarSling's agent PRs applied, running on StarSling runners. "StarSling" on this page always means this one configuration. |
| **Round** | One replay of the event on every runner configuration. Medians use only complete rounds. |
| **Cold / warm cache** | Cold starts with no GitHub Actions caches; warm starts from caches a seed run produced on the same runner configuration. |
| **Cost neutral** | The agent PRs save runner time without adding parallel jobs that spend it again. |

## Appendix

<details>
<summary>Agent PRs</summary>

Merged in this order. Each fix's own measurement, on the CI step it changes, is under What we changed.

| # | Agent PR | What it changed |
|---:|---|---|
| 1 | [pull/1](https://github.com/starsling-demo-org/benchmark-shellcheck/pull/1) | Caches the build directory of the `linux.armv6hf` build and builds incrementally. Three files: the workflow restores a persistent `dist-newstyle` with `actions/cache`, the builder container mounts it, and `build.incremental` restores the old modification times of source files whose content is unchanged, so GHC 9.0 recompiles only the modules that changed. Adds one `sudo chown` step. |

</details>

<details>
<summary>What was slow</summary>

Every merge to ShellCheck's default branch runs one workflow, `build.yml`. After the source package, its 13 test and build jobs start together. All but one finish in a few minutes. The `linux.armv6hf` build does not: it builds ShellCheck with GHC 9.0 inside an emulated ARM chroot, from scratch each time, and nothing is cached between runs. That one job is almost the whole wait: in this benchmark, cold, it took a median 1893 s of the 2019 s merge on GitHub-hosted runners, and 1198 s of the 1292 s merge on StarSling Runners (with agents), where a cold run has nothing to restore. The next-longest jobs are the test suites, the longest of them GHC 8.0 at a median 495 s on GitHub-hosted runners and 334 s on StarSling Runners (with agents), cold.

</details>

<details>
<summary>What we changed</summary>

The original showcase for this project proposed one fix: keep the `linux.armv6hf` build directory between runs and compile only what changed. It was measured on its own on StarSling Runners, with 5 runs on each side (the CI as it was, and the CI with the fix), on the step it changes.

| Fix | Result | Decision |
|---|---|---|
| Cache the `linux.armv6hf` build directory and build incrementally | `linux.armv6hf` build step, warm: 1220 s to 88 s (median); every run with the fix beat every run without it. Cold (nothing to restore): 1191 s to 1183 s | Kept (agent PR 1) |

The agent PR's own check, in full: `linux.armv6hf` build step, warm: 1220 s to 88 s (median, 5 runs per side, on StarSling Runners with and without the PR); every run with the PR beat every run without it (slowest with it 89 s, fastest without it 1194 s). Cold (nothing to restore): 1191 s to 1183 s.

With the fix, the `linux.armv6hf` job takes a median 95 s warm, and the test suites become the longest jobs. The fix is a cache, so it only helps when a cache from an earlier merge exists, and only as far as that merge's changes are small. The replayed merge changes only the manual page (`shellcheck.1.md`), so on the warm runs no Haskell module had to be recompiled. A merge that changes Haskell modules recompiles those modules, and one that changes `ShellCheck.cabal`, the builder image or a core module (`AST`, `Interface`, `Prelude`) recompiles most of them and gains little.

- [Cache the `linux.armv6hf` build directory and build incrementally](https://github.com/starsling-demo-org/benchmark-shellcheck/pull/1)

</details>

<details>
<summary>Every sample, with links to its runs</summary>

Each cell is the whole wait for that merge and links to its run.

| Upstream commit | Cache | Round | GitHub-hosted runners | StarSling Runners (with agents) |
|---|---|---:|---:|---:|
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 1 | [22.98 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43870822057) | [6.32 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43878918717) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 2 | [35.92 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43904254387) | 6.32 min |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 3 | [35.92 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43926741448) | 6.78 min |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 4 | 26.48 min | 6.70 min |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 5 | 34.50 min | 6.32 min |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 1 | [23.15 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43806756240) | [21.37 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43814397445) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 2 | [36.67 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43823176440) | [21.53 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43817240754) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 3 | [36.47 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43831112894) | [21.45 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43827808520) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 4 | [33.65 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43840185154) | [23.52 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43845720863) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 5 | [26.97 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43857265147) | [22.10 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43861646905) |

</details>

<details>
<summary>Method</summary>

1. **Pin.** koalaman/shellcheck is pinned at [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5), the [`upstream/`](upstream) submodule in this repository. Each scenario replays one real upstream event: the merge of [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) (upstream PR #3580) to the default branch.
2. **Replay natively.** Each sample lands that exact tree on this repository as a merge to the default branch and fires the real GitHub event. Every workflow, job and step runs with its own triggers, filters, `needs`, conditions and matrices, in the order GitHub schedules them.
3. **Runner configurations.** GitHub-hosted runners run the CI unchanged; StarSling Runners (with agents) run it with the agent PR applied.
4. **Rounds.** 5 rounds, warm and cold; in each, every runner configuration replays the event once. Medians use only complete rounds, and a sample counts only if every expected job succeeded on the first attempt.
5. **Control caches.** Warm cache: every sample starts from caches a seed run produced on the same runner configuration; seed time is not counted. Cold cache: every sample starts with no GitHub Actions caches.
6. **Check.** Replays are compared job by job with upstream's own run for the same commit, and every sample's test verdicts, coverage and cache restores are read from its own job logs.

- **Control configuration.** For the agent PR's own check, StarSling Runners also ran the CI unchanged; those samples are not in the Results.
- **Default branch.** Upstream's default branch is `master`.
- **Workflows in this merge.** The replayed merge runs `build.yml` (package the source, test under six GHC versions, build seven targets, package the binaries). Upstream's other workflow, `distrotest.yaml`, runs only on a release, a schedule or a manual dispatch, so it does not run here. The ARM, macOS, Windows and RISC-V binaries are cross-built inside Docker on the x64 Linux runners, so no job runs on other hardware; the `linux.armv6hf` build runs in an emulated (qemu) chroot in every configuration.
- **Lanes.** Samples ran concurrently, each in its own cache scope (one separate copy of this repository per lane, with the same branches, events and payloads); 14 samples came from an earlier sequential run of the same configuration. The other 6 samples, all warm, ran in the lanes: GitHub-hosted runners rounds 4 and 5, and StarSling Runners (with agents) rounds 2 to 5. Those copies are not public, so samples that ran in them appear in the sample table without a run link.
- **Bench-only changes, identical in every configuration and never part of the agent PR:**
  - Switched off: the `Deploy binaries` job (GitHub release upload, Docker Hub push and a 300-second sleep). Upstream's own condition is kept with `false &&` in front. Its secrets do not exist here and nothing may be published. Upstream's run did execute this job, including the 5-minute sleep, so that upstream work is not in any column, and these waits are shorter than upstream's own run by design.
  - The three secret references (`DOCKER_USERNAME`, `DOCKER_PASSWORD`, `DOCKER_EMAIL`) are removed; only the switched-off job reads them.
  - Version string: `setgitversion` runs `git describe`, which is changed to `git describe --tags --always` so it cannot fail when no tag is found. It changes only the version text.
  - Runner labels: upstream's `ubuntu-latest` is replaced by the runner label of each configuration (see Runner sizes).
  - One harness step, `Benchmark event context (harness)`, is added at the start of every job. It prints two IDs so each job can be matched to its sample; its median time is 0 s.
  - On the agent PR's own branch (`starsling/develop`) only, a setup commit points the workflow's triggers at that branch and its runners at StarSling, so the PR's checks run there. The measured replays do not use it.
- **Caches and the warm seed.** Before each warm sample, a seed run replays the previous upstream merge ([`2c5668ba`](https://github.com/koalaman/shellcheck/commit/2c5668bac4dabd53afe57b4faa60b7054cd064bb), onto `5d6a0bb1`, which changes `src/ShellCheck/Analytics.hs`) on the same configuration and the same branch, so the sample can read the cache it saves; its time is not counted. Upstream's own tests failed on that merge (upstream run [42545272915](https://github.com/koalaman/shellcheck/actions/runs/42545272915)); every seed run used here passed. In every warm sample with the agent PR, the `linux.armv6hf` build restored the build cache saved for the seed's merge.
- **Root and non-root StarSling jobs.** StarSling switched jobs from root to an ordinary user during the benchmark. Samples are classed by their first workflow start. As root: all 5 cold StarSling samples and warm round 1 of StarSling Runners (with agents) (plus warm rounds 1 and 2 of the agent PR's own check). As an ordinary user: warm rounds 2 to 5 of StarSling Runners (with agents) (plus warm rounds 3 to 5 of the agent PR's own check). A check before pooling found no shift: the agent PR's build step took 83 s in the one warm root sample and 78 to 86 s in the four ordinary-user ones.
- **Replaced samples.** One sample that never finished was discarded and re-run: the StarSling Runners (with agents) sample of cold round 1; it left no record. The experiment was reopened (the reopening is recorded in the experiment record) and the sample re-run from a fresh cold cache. Separately, StarSling samples count only when every StarSling runner used a RAM disk for storage. Two warm StarSling samples ran after a StarSling storage change on runners that used disk storage or whose storage could not be confirmed; they were voided and re-run in the lanes: StarSling Runners (with agents) rounds 2 and 3. In every counted sample, no job waited more than 27 s for a runner.
- **Runner sizes.** Upstream's `ubuntu-latest` jobs run on GitHub `ubuntu-26.04-4core` (4 vCPU, 16 GiB) and StarSling `starsling-ubuntu-26.04` (4 vCPU, 16 GiB). StarSling's 4 vCPU runners can burst to 5 vCPU and 32 GB RAM (Afterburner); GitHub's 4-core runners have 16 GB. Every job in this merge runs on those labels.
- **Upstream reference (context only; not like-for-like; not the headline).** What upstream sees today: a median 34.8 min per merge to the default branch on upstream's own GitHub runners (n=12, most recent comparable merges to the default branch within the last 60 days; standard runners, warm caches, many commits; not a like-for-like replay).

- **Failed or re-run samples** (replaced, not in the medians): GitHub-hosted runners: 0; StarSling Runners (with agents): 3 (2 voided for storage, 1 that never finished and left no record); the agent PR's own check: 2.

</details>

<sub>Generated by `bench showcase` from experiment `full-2`. Machine-readable results: [`benchmark/results.json`](benchmark/results.json).</sub>
