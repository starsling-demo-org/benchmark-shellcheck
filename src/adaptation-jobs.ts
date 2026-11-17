import type { RepositoryAdaptationRule } from './types.ts'

/**
 * Jobs an adaptation switches off on purpose: a rule scoped to one job that sets its `if` to false, either as a
 * `workflow-setting` or as a text rule whose replacement is `if: false ...` / `false && ...`.
 */
export function adaptationDisabledJobs(
  adaptations: RepositoryAdaptationRule[],
): { workflowFile: string; jobId: string }[] {
  const off = /^\s*(?:if:\s*)?(?:\$\{\{\s*)?false\b/
  const out: { workflowFile: string; jobId: string }[] = []
  for (const a of adaptations) {
    if (!a.workflowFile || !a.jobId) continue
    const viaSetting =
      a.kind === 'workflow-setting' &&
      a.setPath?.length === 1 &&
      a.setPath[0] === 'if' &&
      (a.setValue === false || (typeof a.setValue === 'string' && off.test(a.setValue)))
    const viaText = a.kind !== 'workflow-setting' && off.test(a.toReplacement)
    if (viaSetting || viaText) out.push({ workflowFile: a.workflowFile, jobId: a.jobId })
  }
  return out
}
