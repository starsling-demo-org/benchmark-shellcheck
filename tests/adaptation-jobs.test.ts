import { describe, expect, it } from 'vitest'
import { adaptationDisabledJobs } from '../src/adaptation-jobs.ts'
import type { RepositoryAdaptationRule } from '../src/types.ts'

const rule = (over: Partial<RepositoryAdaptationRule>): RepositoryAdaptationRule => ({
  id: 'r',
  kind: 'deployment-guard',
  workflowFile: '.github/workflows/release.yml',
  jobId: 'build',
  fromPattern: 'x',
  toReplacement: 'y',
  reason: 'z',
  ...over,
})

describe('adaptationDisabledJobs', () => {
  it('finds jobs switched off by a workflow-setting or a text guard, and ignores other rules', () => {
    const found = adaptationDisabledJobs([
      rule({ id: 'a', kind: 'workflow-setting', setPath: ['if'], setValue: false }),
      rule({ id: 'b', jobId: 'sign', toReplacement: "if: false && github.event_name == 'push'" }),
      rule({ id: 'c', jobId: 'other', toReplacement: 'if: github.ref == main' }),
      { ...rule({ id: 'd', toReplacement: 'if: false' }), jobId: undefined } as unknown as RepositoryAdaptationRule,
    ])
    expect(found).toEqual([
      { workflowFile: '.github/workflows/release.yml', jobId: 'build' },
      { workflowFile: '.github/workflows/release.yml', jobId: 'sign' },
    ])
  })
})
