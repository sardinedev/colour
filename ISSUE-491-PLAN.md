# Issue 491: performance baseline implementation plan

Handoff plan for Opus 5.5. Implementation has not started and benchmarks have
not been run. Development dependencies were installed during planning, but
`node_modules` was subsequently observed absent. Re-check dependency availability
and run `npm ci` before capture.

- Issue: [#491 — Establish runtime, bundle-size and startup performance baselines](https://github.com/sardinedev/colour/issues/491)
- Tracker: [#490 — Track 5.0.0](https://github.com/sardinedev/colour/issues/490)
- Repository: `sardinedev/colour`
- Starting source revision: `e8a8d81e3d4f7ff12ec3b8f30f83e863fc9f1c63`
- Environment inspected on 2026-10-19: Node `24.22.0`, npm `11.19.1`

1. **Confirm scope and baseline state.**

   Read #491 and its tracker, #490. Record the source revision, working-tree
   state, lockfile hash, Node version, OS, architecture, CPU, and relevant runtime
   flags for each baseline capture.

   Pin production source and the dependency lockfile for the v4 baseline to
   `e8a8d81e3d4f7ff12ec3b8f30f83e863fc9f1c63`, recording the added harness
   revision separately. A post-#494 capture is a distinct baseline. Do not
   substitute the 4.0.0 tag without verifying equivalence.

   This task establishes evidence. Preserve production algorithms, public APIs,
   and the dependency-free runtime. The later v5 baseline depends on approved
   correctness changes landing; explicitly track that outstanding dependency.

2. **Verify the existing benchmark integration.**

   Extend `bench/fixtures.ts`, `bench/analysis.bench.ts`, and
   `bench/conversions.bench.ts`. Retain Vitest and the existing CodSpeed workflow
   at `.github/workflows/codspeed.yml`.

   The inspected repository uses Vitest `5.0.5` and
   `@codspeed/vitest-plugin` `6.0.1`. Its benchmark API uses the `bench`
   test-context fixture. Installed plugin code supports Vitest 5 and selects
   instrumentation when CodSpeed drives the run.

   Run the current suite and verify actual benchmark discovery and reported
   measurements. A successful process exit alone is insufficient. Distinguish
   local timing results from CodSpeed simulation results.

   Preserve existing benchmark identities (file, suite/test path, and name)
   only where measured work stays equivalent. Changed inputs, batch sizes, or
   added result consumption require a new identity or a documented baseline
   reset; preserving a name alone does not preserve comparability.

3. **Expand deterministic workloads.**

   Cover all combinations of palette sizes **2, 16, 256, and 1,000**, target
   counts **1, 10, and 100**, and **RGB, hex, CSS, and mixed formats**.

   Start with the full 48-case grid, including CSS palettes through 1,000
   entries. Preserve the existing 200-entry CSS workload where retained.
   Measure actual CodSpeed runtime before reducing coverage. If runtime
   warrants a PR subset, document its selection and keep full-grid CodSpeed
   coverage on main or manual dispatch, alongside full local baseline captures.

   Reuse each palette across its changing targets. Generate fixtures outside
   timed callbacks using fixed seeds. Keep equivalent underlying colours across
   formats where possible, and document any deliberate differences.

   Extend conversion coverage to short/long hex, alpha boundaries, fractional
   channels, CSS comma/space/slash/percentage forms, invalid inputs, and
   named-colour hits, misses, and aliases. Retain existing analysis, contrast,
   distance, and sorting coverage.

   Add a separate WCAG 2.x workload family for comparison. Treat the existing
   mixed-format composite containing a WCAG3.0 call as historical v4-only
   coverage. Account explicitly for #493's breakpoint correction when
   establishing v5 expected outputs.

   Keep empty and singleton palettes in correctness tests rather than treating
   their early returns as matching throughput.

4. **Make measured work verifiable.**

   Consume every benchmark result through an observable sink or checksum. Check
   expected results outside timed sections, including results produced during
   measurement.

   Use explicit expected values for representative cases and recorded,
   versioned expectations for larger deterministic workloads. Validate fixture
   integrity so malformed inputs or accidental early returns cannot look like
   improvements.

   Record existing v4 behaviour—including known serialization defects
   associated with #494—as historical observations. Do not turn those defects
   into requirements for v5.

   Keep consumption overhead small and consistent, and document that it is
   included in timings. Adding result consumption changes measured work, so
   affected existing cases require a new identity or a documented baseline
   reset under step 2's rule.

5. **Capture repeated steady-state results.**

   Add a reproducible capture command using the existing Vitest runner. Save
   machine-readable results, case names, operation counts, environment
   metadata, and exact invocation.

   Run an initial series of at least five independent captures with consistent
   warmup settings and without competing verification jobs. Report batch
   latency and clarify how it relates to queries per second.

   Derive per-case variability from those runs. Flag unstable measurements and
   collect more evidence where necessary. Do not introduce a universal
   regression percentage or compare local wall-clock timings directly with
   CodSpeed simulation measurements.

6. **Measure startup and allocation separately.**

   Measure cold module loading in a fresh Node process for every sample, using
   built distribution artifacts. Report module import duration separately from
   total subprocess duration. Consume an export and disclose that filesystem
   caches may remain warm.

   Add focused allocation/GC measurements for repeated large-palette matching
   and representative parsing workloads. Use supported V8 allocation sampling
   or profiling and GC observations, recording operation counts and profiler
   settings.

   Keep profiling separate from throughput measurements. A before/after heap
   delta measures retained memory and must not be presented as allocation rate.

7. **Capture distribution and consumer costs.**

   Measure raw, gzip, and Brotli sizes of full-library artifacts and
   representative consumer bundles using named imports through the package's
   public entry point.

   Suggested consumers: hex conversion, contrast calculation, palette matching,
   and named-colour lookup. Ensure bundlers retain the measured functionality.

   Record JavaScript build time, declaration build time, packed tarball size,
   and unpacked package size as distinct metrics. Use a separately selected
   configuration such as `bench/size-limit.config.json` for additional size
   measurements. Keep the package's existing size-limit configuration and PR
   comment stable, and continue running `npm run size` alongside the expanded
   capture.

   Inspect `.github/workflows/publish.yml`: it creates a browser artifact using
   `npx esbuild`. The lockfile lists esbuild only as Vite's optional peer, with
   no resolved esbuild package. Record the version npm actually resolves and
   use that exact version for all captures and reproduction commands. Report
   the unpinned release tooling as a finding. Pinning a project dependency or
   changing publishing is a separate change; do not silently substitute a
   different minifier.

   Build JavaScript, emit declarations, generate the browser artifact with the
   recorded esbuild version, then pack. Verify the package file list and avoid
   stale artifacts. Describe this as a reproduction of the release recipe;
   reproducing historical published bytes requires the original tooling
   versions.

8. **Document comparison rules and the v5 follow-up.**

   Check in the v4 baseline report and reproducible commands under
   `bench/baselines/v4-e8a8d81/<environment-id>/`, with `README.md`,
   `manifest.json`, and compact `runs/*.json` providing enough raw evidence to
   audit the conclusions. Write disposable bundles, tarballs, and profiles
   beneath an ignored `.performance/` directory. Add explicit `*.cpuprofile`
   and `*.heapprofile` ignore entries to prevent accidental profile commits.

   Explain how measured variability informs regression investigation and
   eventual accepted budgets. Initial observations should not silently become
   approved release thresholds.

   When approved v5 contracts land, rerun equivalent workloads before
   optimization. Review changed expected outputs explicitly and establish a
   separate v5 baseline. Do not count removed work or changed semantics as
   algorithmic speedups.

9. **Verify and report limits honestly.**

   Widen the lint command to include `bench/` and any capture-script directory
   alongside `src`, so CI enforces those checks too. Limit formatting changes
   to the relevant files.

   Run `npm run test`, `npm run lint`, `npm run types:check`, `npm run build`,
   `npm run types:emit`, `npm run bench`, and `npm run size`.

   Verify CodSpeed reports the intended benchmark cases when CI is available.
   If remote instrumentation cannot be exercised, document that limitation
   rather than claiming verification.

   Deliver the harness changes, reproducible v4 evidence, measurement
   methodology, and clearly identified remaining dependencies. Do not close
   #491 as fully satisfied while its required v5 baseline remains outstanding.
