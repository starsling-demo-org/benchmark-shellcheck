# StarSling Whole-Pipeline Benchmark Report (`full-2`)

- **Upstream:** `koalaman/shellcheck@1046c00b61516a64f85a45e5fbdc69c6c1654eb5`
- **Timestamp Resolution:** `1s` (GitHub Actions workflow/job/step timestamps)

## Event `main-push` · cold cache

**Total speedup 1.56×: hardware speedup 1.55×, self-improving CI speedup 1.01× on StarSling Runners and — on GitHub-hosted runners. Evidence: coverage-qualified.**

### Runner configurations

| Runner configuration | Complete / requested | CI duration p50 (IQR) | CI minutes p50 | Estimated cost p50 (USD) | Trigger latency p50 | Harness overhead p50 |
|---|---|---|---|---|---|---|
| `github-baseline` | 5/5 | 2019.0 s (IQR 570.0 s, n=5) | 100.93 min | $1.7440 | 4.0 s | 0.0 s |
| `starsling-baseline` | 5/5 | 1299.0 s (IQR 29.0 s, n=5) | 65.72 min | $0.5840 | 4.0 s | 0.0 s |
| `starsling-patched` | 5/5 | 1292.0 s (IQR 39.0 s, n=5) | 65.53 min | $0.5840 | 4.0 s | 0.0 s |

### Speedups

| Speedup | Ratio | Compares | Cost neutral |
|---|---|---|---|
| `github-baseline` / `github-patched` | — | Self-improving CI speedup, GitHub-hosted runners | Not established (Self-improving CI changed which runners jobs use, so its speedup includes a hardware change.) |
| `starsling-baseline` / `starsling-patched` | 1.01× | Self-improving CI speedup, StarSling Runners | Yes |
| `github-baseline` / `starsling-baseline` | 1.55× | Hardware speedup | Not applicable: hardware speedups never establish it |
| `github-baseline` / `starsling-patched` | 1.56× | Total speedup | Not applicable |

### Step times

| Workflow › job | Step | Change | GitHub-hosted p50 | GitHub-hosted, self-improving CI p50 | StarSling, hardware only p50 | StarSling, self-improving CI p50 |
|---|---|---|---|---|---|---|
| `.github/workflows/build.yml#package_source` | Set up job | `matched` | 0.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Install Dependencies | `matched` | 15.0 s | — | 10.0 s | 11.0 s |
| `.github/workflows/build.yml#package_source` | Checkout repository | `matched` | 1.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Deduce tags | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Package Source | `matched` | 3.0 s | — | 0.0 s | 1.0 s |
| `.github/workflows/build.yml#package_source` | Upload artifact | `matched` | 1.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Set up job | `matched` | 1.0 s | — | 0.0 s | 1.0 s |
| `.github/workflows/build.yml#run_tests` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Download artifacts | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#run_tests` | Setup Haskell | `matched` | 105.0 s | — | 60.5 s | 62.0 s |
| `.github/workflows/build.yml#run_tests` | Unpack source | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Build and run tests | `matched` | 332.0 s | — | 227.5 s | 226.5 s |
| `.github/workflows/build.yml#run_tests` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Set up job | `matched` | 1.0 s | — | 0.0 s | 1.0 s |
| `.github/workflows/build.yml#build_source` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Checkout repository | `matched` | 1.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Download artifacts | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#build_source` | Build source | `matched` | 226.0 s | — | 162.0 s | 164.0 s |
| `.github/workflows/build.yml#build_source` | Upload artifact | `matched` | 2.0 s | — | 2.0 s | 2.0 s |
| `.github/workflows/build.yml#build_source` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Set up job | `matched` | 1.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Checkout repository | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_binary` | Download artifacts | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_binary` | Install dependency | `matched` | 11.0 s | — | 6.0 s | 6.0 s |
| `.github/workflows/build.yml#package_binary` | List files for debugging | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Work around GitHub permissions bug | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Package binaries and man | `matched` | 62.0 s | — | 48.0 s | 43.0 s |
| `.github/workflows/build.yml#package_binary` | Upload artifact | `matched` | 4.0 s | — | 3.0 s | 3.0 s |
| `.github/workflows/build.yml#package_binary` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Restore the armv6hf build tree | `added` | — | — | — | 0.0 s |
| `.github/workflows/build.yml#build_source` | Post Restore the armv6hf build tree | `added` | — | — | — | 2.0 s |

### Samples

| Sample ID | Round | Runner configuration | Complete | CI duration | CI minutes | Runs and diagnostics |
|---|---|---|---|---|---|---|
| `full-2-main-push-cold-rep1-starsling-baseline` | 1 | `starsling-baseline` | ✓ | 1363.0 s | 67.27m | [run #43804245915](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43804245915) |
| `full-2-main-push-cold-rep1-github-baseline` | 1 | `github-baseline` | ✓ | 1389.0 s | 91.55m | [run #43806756240](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43806756240) |
| `full-2-main-push-cold-rep1-starsling-patched` | 1 | `starsling-patched` | ✓ | 1282.0 s | 66.03m | [run #43814397445](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43814397445) |
| `full-2-main-push-cold-rep2-starsling-patched` | 2 | `starsling-patched` | ✓ | 1292.0 s | 65.38m | [run #43817240754](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43817240754) |
| `full-2-main-push-cold-rep2-starsling-baseline` | 2 | `starsling-baseline` | ✓ | 1319.0 s | 67.22m | [run #43820207619](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43820207619) |
| `full-2-main-push-cold-rep2-github-baseline` | 2 | `github-baseline` | ✓ | 2200.0 s | 105.70m | [run #43823176440](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43823176440) |
| `full-2-main-push-cold-rep3-starsling-patched` | 3 | `starsling-patched` | ✓ | 1287.0 s | 65.53m | [run #43827808520](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43827808520) |
| `full-2-main-push-cold-rep3-github-baseline` | 3 | `github-baseline` | ✓ | 2188.0 s | 104.00m | [run #43831112894](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43831112894) |
| `full-2-main-push-cold-rep3-starsling-baseline` | 3 | `starsling-baseline` | ✓ | 1283.0 s | 64.50m | [run #43836532627](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43836532627) |
| `full-2-main-push-cold-rep4-github-baseline` | 4 | `github-baseline` | ✓ | 2019.0 s | 100.93m | [run #43840185154](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43840185154) |
| `full-2-main-push-cold-rep4-starsling-patched` | 4 | `starsling-patched` | ✓ | 1411.0 s | 67.32m | [run #43845720863](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43845720863) |
| `full-2-main-push-cold-rep4-starsling-baseline` | 4 | `starsling-baseline` | ✓ | 1290.0 s | 64.90m | [run #43849910442](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43849910442) |
| `full-2-main-push-cold-rep5-starsling-baseline` | 5 | `starsling-baseline` | ✓ | 1299.0 s | 65.72m | [run #43853533975](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43853533975) |
| `full-2-main-push-cold-rep5-github-baseline` | 5 | `github-baseline` | ✓ | 1618.0 s | 92.22m | [run #43857265147](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43857265147) |
| `full-2-main-push-cold-rep5-starsling-patched` | 5 | `starsling-patched` | ✓ | 1326.0 s | 65.30m | [run #43861646905](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43861646905) |

## Event `main-push` · warm cache

**Total speedup 5.46×: hardware speedup 1.55×, self-improving CI speedup 3.51× on StarSling Runners and — on GitHub-hosted runners. Evidence: coverage-qualified.**

### Runner configurations

| Runner configuration | Complete / requested | CI duration p50 (IQR) | CI minutes p50 | Estimated cost p50 (USD) | Trigger latency p50 | Harness overhead p50 |
|---|---|---|---|---|---|---|
| `github-baseline` | 5/5 | 2070.0 s (IQR 566.0 s, n=5) | 102.73 min | $1.7760 | 5.0 s | 1.0 s |
| `starsling-baseline` | 5/5 | 1332.0 s (IQR 84.0 s, n=5) | 69.23 min | $0.6160 | 4.0 s | 0.0 s |
| `starsling-patched` | 5/5 | 379.0 s (IQR 23.0 s, n=5) | 48.72 min | $0.4480 | 5.0 s | 0.0 s |

### Speedups

| Speedup | Ratio | Compares | Cost neutral |
|---|---|---|---|
| `github-baseline` / `github-patched` | — | Self-improving CI speedup, GitHub-hosted runners | Not established (Self-improving CI changed which runners jobs use, so its speedup includes a hardware change.) |
| `starsling-baseline` / `starsling-patched` | 3.51× | Self-improving CI speedup, StarSling Runners | Yes |
| `github-baseline` / `starsling-baseline` | 1.55× | Hardware speedup | Not applicable: hardware speedups never establish it |
| `github-baseline` / `starsling-patched` | 5.46× | Total speedup | Not applicable |

### Step times

| Workflow › job | Step | Change | GitHub-hosted p50 | GitHub-hosted, self-improving CI p50 | StarSling, hardware only p50 | StarSling, self-improving CI p50 |
|---|---|---|---|---|---|---|
| `.github/workflows/build.yml#package_source` | Set up job | `matched` | 0.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_source` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Install Dependencies | `matched` | 17.0 s | — | 10.0 s | 11.0 s |
| `.github/workflows/build.yml#package_source` | Checkout repository | `matched` | 2.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_source` | Deduce tags | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Package Source | `matched` | 3.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Upload artifact | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_source` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Set up job | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#run_tests` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Download artifacts | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#run_tests` | Setup Haskell | `matched` | 112.0 s | — | 78.5 s | 68.0 s |
| `.github/workflows/build.yml#run_tests` | Unpack source | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Build and run tests | `matched` | 329.5 s | — | 231.0 s | 226.5 s |
| `.github/workflows/build.yml#run_tests` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Set up job | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#build_source` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Checkout repository | `matched` | 1.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Download artifacts | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#build_source` | Build source | `matched` | 222.0 s | — | 161.0 s | 124.0 s |
| `.github/workflows/build.yml#build_source` | Upload artifact | `matched` | 2.0 s | — | 2.0 s | 2.0 s |
| `.github/workflows/build.yml#build_source` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Set up job | `matched` | 1.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Checkout repository | `matched` | 1.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Download artifacts | `matched` | 2.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/build.yml#package_binary` | Install dependency | `matched` | 11.0 s | — | 6.0 s | 7.0 s |
| `.github/workflows/build.yml#package_binary` | List files for debugging | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Work around GitHub permissions bug | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Package binaries and man | `matched` | 68.0 s | — | 44.0 s | 44.0 s |
| `.github/workflows/build.yml#package_binary` | Upload artifact | `matched` | 5.0 s | — | 4.0 s | 3.0 s |
| `.github/workflows/build.yml#package_binary` | Post Checkout repository | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_source` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#run_tests` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#package_binary` | Set up runner | `matched` | — | — | 0.0 s | 1.0 s |
| `.github/workflows/build.yml#package_binary` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/build.yml#build_source` | Restore the armv6hf build tree | `added` | — | — | — | 0.0 s |
| `.github/workflows/build.yml#build_source` | Post Restore the armv6hf build tree | `added` | — | — | — | 1.0 s |

### Samples

| Sample ID | Round | Runner configuration | Complete | CI duration | CI minutes | Runs and diagnostics |
|---|---|---|---|---|---|---|
| `full-2-main-push-warm-rep1-github-baseline` | 1 | `github-baseline` | ✓ | 1379.0 s | 91.72m | [run #43870822057](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43870822057) |
| `full-2-main-push-warm-rep1-starsling-patched` | 1 | `starsling-patched` | ✓ | 379.0 s | 46.35m | [run #43878918717](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43878918717) |
| `full-2-main-push-warm-rep1-starsling-baseline` | 1 | `starsling-baseline` | ✓ | 1665.0 s | 71.78m | [run #43884879983](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43884879983) |
| `full-2-main-push-warm-rep2-starsling-baseline` | 2 | `starsling-baseline` | ✓ | 1298.0 s | 66.53m | [run #43894580040](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43894580040) |
| `full-2-main-push-warm-rep2-github-baseline` | 2 | `github-baseline` | ✓ | 2155.0 s | 104.97m | [run #43904254387](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43904254387) |
| `full-2-main-push-warm-rep3-github-baseline` | 3 | `github-baseline` | ✓ | 2155.0 s | 104.55m | [run #43926741448](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43926741448) |
| `full-2-main-push-warm-rep5-starsling-patched` | 5 | `starsling-patched` | ✓ | 379.0 s | 48.72m | [run #43972867515](https://github.com/starsling-demo-org/benchmark-shellcheck-lane3/actions/runs/43972867515) |
| `full-2-main-push-warm-rep5-starsling-baseline` | 5 | `starsling-baseline` | ✓ | 1415.0 s | 69.58m | [run #43971754209](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43971754209) |
| `full-2-main-push-warm-rep5-github-baseline` | 5 | `github-baseline` | ✓ | 2070.0 s | 102.73m | [run #43973521730](https://github.com/starsling-demo-org/benchmark-shellcheck-lane1/actions/runs/43973521730) |
| `full-2-main-push-warm-rep4-starsling-patched` | 4 | `starsling-patched` | ✓ | 402.0 s | 48.97m | [run #43979754081](https://github.com/starsling-demo-org/benchmark-shellcheck-lane4/actions/runs/43979754081) |
| `full-2-main-push-warm-rep4-starsling-baseline-retry1` | 4 | `starsling-baseline` | ✓ | 1332.0 s | 67.75m | [run #43980209383](https://github.com/starsling-demo-org/benchmark-shellcheck-lane3/actions/runs/43980209383) |
| `full-2-main-push-warm-rep3-starsling-patched-retry1` | 3 | `starsling-patched` | ✓ | 407.0 s | 49.00m | [run #43981009271](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43981009271) |
| `full-2-main-push-warm-rep4-github-baseline` | 4 | `github-baseline` | ✓ | 1589.0 s | 89.22m | [run #43984879998](https://github.com/starsling-demo-org/benchmark-shellcheck-lane1/actions/runs/43984879998) |
| `full-2-main-push-warm-rep3-starsling-baseline-retry1` | 3 | `starsling-baseline` | ✓ | 1331.0 s | 69.23m | [run #43986469811](https://github.com/starsling-demo-org/benchmark-shellcheck-lane4/actions/runs/43986469811) |
| `full-2-main-push-warm-rep2-starsling-patched-retry1` | 2 | `starsling-patched` | ✓ | 379.0 s | 47.58m | [run #43994599552](https://github.com/starsling-demo-org/benchmark-shellcheck-lane2/actions/runs/43994599552) |
| `full-2-main-push-warm-rep2-starsling-patched` | 2 | `starsling-patched` | ✗ | 375.0 s | 47.73m | [run #43918609883](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43918609883) (StarSling runner without RAM disk (undefined: storage unknown after the switch)) |
| `full-2-main-push-warm-rep3-starsling-baseline` | 3 | `starsling-baseline` | ✗ | 1379.0 s | 68.38m | [run #43937903253](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43937903253) (StarSling runner without RAM disk (starsling-z-7ff30845b82a42088cfb342c8e6440b4: storage unknown after the switch; starsling-z-d586ed036a1e4292a5650d252fdb1b72: storage unknown after the switch; starsling-z-d21c2f76c248433982a88f4b2adb5e3a: storage unknown after the switch; starsling-z-b6bc4bd903b440e9b69244c77fc6436f: storage unknown after the switch; starsling-z-ccb0a6afc96242d587ae8fb8165e4757: storage unknown after the switch; starsling-z-ec7cd20f5a224411a425eec39ee930c7: storage unknown after the switch; starsling-z-21d8922995e4478383cedad7f9778008: storage unknown after the switch; starsling-z-b89af8fc458644fba073db845e59b998: storage unknown after the switch; starsling-z-992db0a6246c4d5fa77927e50cbc9607: storage unknown after the switch; starsling-z-f0017f4a759e40fc92b029917f5afac4: storage unknown after the switch; starsling-z-96a86faeb4474641af8f70d359f6d0ff: storage unknown after the switch; starsling-z-261ed670247b46d79d40b693c48492db: storage unknown after the switch; starsling-z-48d1d6eaf4264fe3a518fbb1b0fa556e: storage unknown after the switch; starsling-z-af6520715a22456d83023dd24ce9051b: storage unknown after the switch; starsling-z-ce0e2d875334444c8d794f7d681ff5a3: storage unknown after the switch; undefined: storage unknown after the switch)) |
| `full-2-main-push-warm-rep3-starsling-patched` | 3 | `starsling-patched` | ✗ | 375.0 s | 48.00m | [run #43946611877](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43946611877) (StarSling runner without RAM disk (starsling-z-7870d79bcf6d4d80bc0091828f4d80f0: storage unknown after the switch; starsling-z-e87896386a854ba0a26b2b4a763a6308: storage unknown after the switch; starsling-z-4cd94f9950ef40129078495a598de493: storage unknown after the switch; starsling-z-ef8694db61c7471c99783dc5fe7becb1: storage unknown after the switch; starsling-z-82d7988b62c7412cb0b428a0bd79d02c: storage unknown after the switch; starsling-z-b310d4da7625419aaf66b66ae93f5c32: storage unknown after the switch; starsling-z-4947457db2ba4a63a13f156331804cca: storage unknown after the switch; starsling-z-0c40a86538584a2c9ac93fb1a62b3148: storage unknown after the switch; starsling-z-92b4b88c21c84a40bcfee662c9c70e03: storage unknown after the switch; starsling-z-5d71deb86a1f45d4bb0fc2778730c22a: storage unknown after the switch; starsling-z-e1f25348cafe4ff3992153d9436c2bed: storage unknown after the switch; starsling-z-0166f367495940a0a25f8575820e7737: storage unknown after the switch; starsling-z-d6abc1ab151f4087bf41398d9936b4f1: storage unknown after the switch; starsling-z-d62d7785263244a8863a845f989b709c: storage unknown after the switch; starsling-z-2d62fe76675a4cd4912887024f5f25ad: storage unknown after the switch; undefined: storage unknown after the switch)) |
| `full-2-main-push-warm-rep4-starsling-baseline` | 4 | `starsling-baseline` | ✗ | 1308.0 s | 68.45m | [run #43952831868](https://github.com/starsling-demo-org/benchmark-shellcheck/actions/runs/43952831868) (StarSling runner without RAM disk (starsling-z-2a99df17336e4a11a501c18a6b78603d: storage unknown after the switch; starsling-z-68fa184bee384f48978b0792246094bc: storage unknown after the switch; starsling-z-8458ed5da71049d5a7966e6a953303a7: disk; starsling-z-019fc639b7314297891f5fc136766abe: storage unknown after the switch; starsling-z-74179ee8d9da45a5a925bf03e83b2e69: disk; starsling-z-e339155202574c9db9f20198afa3f005: storage unknown after the switch; starsling-z-c8bdfac647d14c9faff8bb56462a6e77: storage unknown after the switch; starsling-z-9130b6f49a1d4d31aee5d62c8a58a04f: storage unknown after the switch; starsling-z-145afd71d1974fcdba895b1085251150: disk; starsling-z-ec31e54bd96349c79fd3393967bb743d: disk; starsling-z-95eee07046104a8090a58656bd1435cc: storage unknown after the switch; starsling-z-af57bde0bf9d494e9d361fd8716ab2e7: disk; starsling-z-9ac94f6c631f4a73880cd9d651316aea: storage unknown after the switch; starsling-z-27e20bbf96f6423aa2f99a438cfb24ba: storage unknown after the switch; undefined: storage unknown after the switch)) |



## GitHub API calls

Budget: 252 calls per hour for this controller. Free `304 Not Modified` answers are listed separately and do not count against the account.

- **Experiment:** 1567 calls (1966 free 304s); job-logs 554, jobs 375, artifacts 254, run-list 196, workflows 81, workflow-write 72, caches 19, cache-delete 11, other-read 5
- **Waiting:** 15321 s stretched to fit the budget, 0 s waiting for an account reset

| Sample | Calls | Free 304s | Biggest callers |
| --- | ---: | ---: | --- |
| `full-1-main-push-cold-rep1-starsling-baseline` | 47 | 53 | job-logs 15, jobs 12, artifacts 7, run-list 5, workflows 5, workflow-write 3 |
| `full-1-main-push-cold-rep1-github-baseline` | 46 | 64 | job-logs 15, jobs 14, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep1-starsling-patched` | 51 | 43 | job-logs 15, run-list 10, jobs 10, artifacts 8, workflows 5, workflow-write 3 |
| `full-1-main-push-cold-rep2-starsling-patched` | 42 | 53 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep2-starsling-baseline` | 43 | 58 | job-logs 15, jobs 11, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep2-github-baseline` | 47 | 81 | job-logs 15, jobs 14, artifacts 9, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep3-starsling-patched` | 41 | 55 | job-logs 15, jobs 10, artifacts 8, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep3-github-baseline` | 47 | 83 | job-logs 15, jobs 13, run-list 8, artifacts 7, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep3-starsling-baseline` | 40 | 55 | job-logs 15, jobs 10, artifacts 6, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep4-github-baseline` | 41 | 78 | job-logs 15, jobs 11, artifacts 7, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep4-starsling-patched` | 42 | 56 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep4-starsling-baseline` | 42 | 53 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep5-starsling-baseline` | 41 | 57 | job-logs 15, jobs 11, artifacts 6, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep5-github-baseline` | 43 | 67 | job-logs 15, jobs 13, artifacts 7, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-cold-rep5-starsling-patched` | 42 | 53 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-github-baseline-seed` | 42 | 83 | job-logs 15, jobs 12, artifacts 7, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-github-baseline` | 47 | 63 | jobs 15, job-logs 15, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-starsling-patched-seed` | 40 | 53 | job-logs 15, jobs 9, run-list 6, artifacts 6, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-starsling-patched` | 37 | 25 | job-logs 15, jobs 7, artifacts 6, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-starsling-baseline-seed` | 41 | 54 | job-logs 15, jobs 10, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep1-starsling-baseline` | 41 | 66 | job-logs 15, jobs 10, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-starsling-baseline-seed` | 42 | 53 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-starsling-baseline` | 42 | 53 | job-logs 15, jobs 10, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-github-baseline-seed` | 43 | 67 | job-logs 15, jobs 11, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-github-baseline` | 59 | 66 | job-logs 28, jobs 12, run-list 9, artifacts 6, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-starsling-patched-seed` | 44 | 32 | job-logs 15, jobs 10, run-list 9, artifacts 6, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep2-starsling-patched` | 43 | 11 | job-logs 15, run-list 10, jobs 7, artifacts 7, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-github-baseline-seed` | 41 | 67 | job-logs 15, jobs 11, artifacts 7, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-github-baseline` | 40 | 74 | job-logs 15, jobs 11, artifacts 6, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-starsling-baseline-seed` | 43 | 47 | job-logs 15, jobs 11, artifacts 8, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-starsling-baseline` | 42 | 48 | job-logs 15, jobs 11, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-starsling-patched-seed` | 41 | 46 | job-logs 15, jobs 10, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep3-starsling-patched` | 38 | 19 | job-logs 15, jobs 7, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep4-starsling-baseline-seed` | 42 | 48 | job-logs 15, jobs 11, artifacts 7, run-list 5, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep4-starsling-baseline` | 40 | 47 | job-logs 15, jobs 10, artifacts 7, run-list 4, workflows 2, workflow-write 2 |
| `full-1-main-push-warm-rep4-starsling-patched-seed` | 19 | 0 | job-logs 16, run-list 1, jobs 1, artifacts 1 |
