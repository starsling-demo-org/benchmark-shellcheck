# shellcheck CI: GitHub vs StarSling

> Not affiliated with [koalaman/shellcheck](https://github.com/koalaman/shellcheck) (40.3k stars). This repository replays shellcheck's own CI on real upstream commits to measure **how much machine time a push uses** (runner time) and **how long it waits for every check**, from the first workflow starting to the last job finishing.

## Results

**Pushes** (typical per push):

Cold: **StarSling: 1.5x less runner time** than GitHub per push (100.93 min → 65.53 min of machine time; GitHub 4 vCPU vs StarSling 4 vCPU). Warm: **StarSling: 2.1x less runner time** than GitHub per push (102.73 min → 48.72 min of machine time; GitHub 4 vCPU vs StarSling 4 vCPU).

StarSling = StarSling runners + StarSling agent PRs.

Cold: Wait: **StarSling is 1.6x faster** than GitHub for a push to finish every check (33.65 min → 21.53 min). Warm: Wait: **StarSling is 5.5x faster** than GitHub for a push to finish every check (34.50 min → 6.32 min).

| | Cold runner time | Cold vs GitHub | Cold wait | Cold vs GitHub | Warm runner time | Warm vs GitHub | Warm wait | Warm vs GitHub |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| GitHub (the project's CI as is, on GitHub-hosted runners) | **100.93 min** | 1x | **33.65 min** | 1x | **102.73 min** | 1x | **34.50 min** | 1x |
| StarSling (StarSling runners + agent PRs) | **65.53 min** | **1.5x** less runner time | **21.53 min** | **1.6x** faster | **48.72 min** | **2.1x** less runner time | **6.32 min** | **5.5x** faster |

Runner time compared at these machine sizes: GitHub 4 vCPU vs StarSling 4 vCPU.

**Where the savings come from**

Runner time:

- Cold: StarSling runners alone (CI unchanged): 65.72 min, **1.5x** less runner time than GitHub
- Cold: StarSling agent PRs, on the same runners: **1.0x** less runner time (65.72 min → 65.53 min)
- Cold: Together: 1.5x × 1.0x = 1.5x
- Warm: StarSling runners alone (CI unchanged): 69.23 min, **1.5x** less runner time than GitHub
- Warm: StarSling agent PRs, on the same runners: **1.4x** less runner time (69.23 min → 48.72 min)
- Warm: Together: 1.5x × 1.4x = 2.1x

Wait:

- Cold: StarSling runners alone (CI unchanged): 21.65 min, **1.6x** faster than GitHub
- Cold: StarSling agent PRs, on the same runners: **1.0x** faster (21.65 min → 21.53 min)
- Cold: Together: 1.6x × 1.0x = 1.6x
- Warm: StarSling runners alone (CI unchanged): 22.20 min, **1.6x** faster than GitHub
- Warm: StarSling agent PRs, on the same runners: **3.5x** faster (22.20 min → 6.32 min)
- Warm: Together: 1.6x × 3.5x = 5.5x

> **4 sample(s) failed or were re-run and replaced** (StarSling unchanged (hardware alone): 2; StarSling + agent PRs: 2). Only complete samples are in the medians.

<sub>Typical = the median over complete rounds. Total = StarSling runners alone × agent PRs on top. Details are in the Appendix.</sub>

## Terms

| Term | Meaning |
|---|---|
| **Runner time** | Total machine time all jobs used for one push, summed across jobs; billed per second. |
| **Wait** | How long one push (or PR update) takes until every check has finished: from the first workflow starting to the last job finishing. |
| **GitHub** | The project's own CI, unchanged, on GitHub-hosted runners (the machines GitHub rents out). |
| **StarSling** | StarSling runners (faster machines) plus StarSling agent PRs (changes to the CI itself). |
| **Agent PRs** | Small pull requests StarSling's agent wrote against the project's CI to make it faster. Each is measured on its own in the Appendix. |
| **Median** | The middle result. Half the runs were faster, half were slower, so one odd run does not move it. |
| **Round** | One replay of the same change on every setup. Only rounds where every setup finished cleanly count. |
| **Cold** | Every run starts with no GitHub Actions caches (saved downloads and build output). |
| **Warm** | Every run starts from caches that an earlier run on the same setup saved. |

## Appendix

<details>
<summary>Agent PRs: what each one changed and its own effect</summary>

Merged in this order. Each row's effect comes from its own before/after experiment; the last row's cumulative wait is the headline.

| # | Agent PR | What it changed | Its own effect (typical wait, before → after) | Wait after it (cumulative) |
|---:|---|---|---|---:|
| 1 | [pull/1](https://github.com/starsling-demo-org/benchmark-shellcheck/pull/1) | armv6hf incremental cache | 21.65 min → 21.53 min (−1%), 5 runs per side | 21.53 min |

</details>

<details>
<summary>What we changed</summary>

- [armv6hf incremental cache](https://github.com/starsling-demo-org/benchmark-shellcheck/pull/1)

</details>

<details>
<summary>Same checks, same results</summary>



</details>

<details>
<summary>Every push, round by round</summary>

Each cell is the whole wait for that push and links to its run.

| Upstream commit | Cache | Round | GitHub unchanged | StarSling unchanged (hardware alone) | StarSling + agent PRs |
|---|---|---:|---:|---:|---:|
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 1 | [23.15 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43806756240) | [22.72 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43804245915) | [21.37 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43814397445) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 2 | [36.67 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43823176440) | [21.98 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43820207619) | [21.53 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43817240754) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 3 | [36.47 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43831112894) | [21.38 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43836532627) | [21.45 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43827808520) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 4 | [33.65 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43840185154) | [21.50 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43849910442) | [23.52 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43845720863) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Cold | 5 | [26.97 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43857265147) | [21.65 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43853533975) | [22.10 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43861646905) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 1 | [22.98 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43870822057) | [27.75 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43884879983) | [6.32 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43878918717) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 2 | [35.92 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43904254387) | [21.63 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43894580040) | [6.32 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43994599552) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 3 | [35.92 min](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43926741448) | [22.18 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane4/actions/runs/43986469811) | [6.78 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43981009271) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 4 | [26.48 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane1/actions/runs/43984879998) | [22.20 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane3/actions/runs/43980209383) | [6.70 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane4/actions/runs/43979754081) |
| [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) | Warm | 5 | [34.50 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane1/actions/runs/43973521730) | [23.58 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43971754209) | [6.32 min](https://github.com/starsling-demo-org/benchmark-shellcheck-lane3/actions/runs/43972867515) |

</details>

<details>
<summary>How it's measured</summary>

1. **Pin.** koalaman/shellcheck is pinned at [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5), the [`upstream/`](upstream) submodule in this repository. Each scenario replays one real upstream event: the merge of [`1046c00b`](https://github.com/koalaman/shellcheck/commit/1046c00b61516a64f85a45e5fbdc69c6c1654eb5) to `master`.
2. **Replay natively.** Each sample pushes that exact tree to this repository's `master` branch and fires the real GitHub event (a push, or a PR synchronize). Every workflow, job and step runs with its own triggers, filters, `needs`, conditions, matrices and `workflow_run` follow-ups, in the order GitHub schedules them.
3. **Runner configurations.** GitHub-hosted runners and StarSling Runners run the CI unchanged; StarSling Runners also run it with the agent PR applied (self-improving CI). Jobs on runners StarSling does not offer stay on GitHub-hosted runners in every configuration and still count.
4. **Rounds.** 5 rounds; in each, every runner configuration replays the event once, in a deterministic shuffled order, one sample at a time. Medians use only complete rounds, and a sample counts only if every expected job succeeded on the first attempt.
5. **Control caches.** Cold cache: Every sample starts with no GitHub Actions caches. Warm cache: Every sample starts from caches a seed run produced on the same runner configuration; seed time is not counted.
6. **Check.** Replays are compared job by job with upstream's own runs for the same commit, and every sample's test verdicts, coverage and cache restores are read from its own job logs.

- Samples ran concurrently, each in its own cache scope (one repository per lane: benchmark-shellcheck-lane1, benchmark-shellcheck-lane2, benchmark-shellcheck-lane3, benchmark-shellcheck-lane4, with the same branches, events and payloads as benchmark-shellcheck); a cold sample ran with no caches in its repository. 21 samples came from an earlier sequential run of the same configuration.

- **Cold:** Every sample starts with no GitHub Actions caches.
- **Warm:** Every sample starts from caches a seed run produced on the same runner configuration; seed time is not counted.
- **Failed or re-run samples** (replaced, not in the medians): GitHub unchanged: 0; StarSling unchanged (hardware alone): 2; StarSling + agent PRs: 2.

</details>

<details>
<summary>Runners</summary>

| Runners | Label | vCPU | Memory |
|---|---|---:|---:|
| GitHub-hosted | `ubuntu-26.04-4core` | 4 | 16 GiB |
| StarSling | `starsling-ubuntu-26.04` | 4 | 16 GiB |

GitHub-hosted jobs run on the explicit GitHub larger-runner label shown, pinned to the size of upstream's public-repository runner, so the comparison does not change with this repository's visibility.

</details>

<sub>Generated by `bench showcase` from experiment `full-2`. Machine-readable results: [`benchmark/results.json`](benchmark/results.json). Configurations: GitHub-hosted runners; StarSling Runners (hardware only); StarSling Runners (self-improving CI).</sub>
