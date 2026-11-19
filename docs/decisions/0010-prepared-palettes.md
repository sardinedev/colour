# 0010. Prepared palettes for repeated matching

- Status: Accepted
- Date: 2026-11-19
- Issue: #499 (tracker #490)
- Implemented in: #540

## Context

Every `findNearest*` call parses each palette entry and converts it to Lab
before running CIEDE2000. A caller matching `q` targets against one palette of
`n` entries therefore does `q × (n + 1)` conversions, even though only the `q`
targets change. A prepared palette would do the `n` conversions once, so `q`
queries cost `n + q` conversions. Distance calculations stay at `q × n`, so this
is a constant-factor saving, not a faster search.

A local estimate made before #533 suggested about half of each RGB query is
spent converting candidates. That estimate is not evidence: per #491, the
numbers that count come from CodSpeed on CI.

## The spike

`src/preparePalette.ts` holds a prototype that is not exported from the
package root:

- `preparePalette(palette)` parses every valid entry and computes its Lab value
  once. It returns a lookup function, `(colour) => entry | null`.
- Rules match [0009](0009-palette-match-results.md): entries must be strings or
  RGB objects that `parseColour` accepts, invalid entries are skipped, values
  are clamped for the distance only, alpha is ignored, and the first entry wins
  ties.
- Strings are returned as given. RGB entries are returned as **frozen copies
  taken at preparation time**, not the caller's objects, because the snapshot
  has to be independent of later edits. This is the one intended difference from
  `findNearestRGBColour`.
- There is no cache, invalidation or global state. The returned closure owns its
  data.

The tests cover the issue's list: identical selection to `findNearestColour`
and `findNearestRGBColour` over 200 random targets, ties and duplicates,
invalid targets and entries, independence from later edits to the caller's
palette, and frozen results that can't corrupt the snapshot.

## What is measured

Timings come from CodSpeed (simulation mode), using
`bench/preparePalette.bench.ts`. Memory comes from
`src/preparePalette.memory.test.ts`, which runs in the normal CI test job on
every supported Node version.

| Workload | Palettes |
| -------- | -------- |
| Preparation alone | 16, 256 and 1,000 hex; 256 RGB |
| One lookup, prepared vs one-shot | 16, 256 and 1,000 hex; 256 RGB |
| Preparation + 1/10/100 lookups vs 1/10/100 one-shot calls | 16 and 256 hex |
| Preparation + 10 lookups vs 10 one-shot calls | 256 RGB |
| Retained memory | V8 heap growth per entry, from a budget test in the regular CI suite (see below) |

The comparison is against the current one-shot functions after #533, #537 and
#538, not against v4.

## Decision criteria (set before measuring)

Ship `preparePalette` in 5.x (it's additive) only if **all** of these hold on
CodSpeed:

1. On the 256-entry palette, a prepared lookup takes at most **⅔ of the time**
   of a one-shot call (at least 1.5× faster).
2. Preparation pays for itself within **3 queries** on the 256-entry palette.
3. Retained memory stays under about **200 bytes per entry**, so a 1,000-entry
   palette is under ~200 KB.

If any criterion fails, defer the API and record why. If they all pass, ship it
as one focused utility with types, tests and docs. Ordinary `findNearest*`
calls must never allocate prepared state implicitly.

## Results

CodSpeed run [`6afedac4`](https://app.codspeed.io/sardinedev/colour/runs/6afedac4d92ce5caace7877b)
on PR #540, commit `16b5c34`. Prepared and one-shot workloads ran in the same
run, on the same runner.

**Single lookup, already prepared vs one ordinary call:**

| Palette | Prepared | One-shot | Prepared ÷ one-shot |
| ------- | -------: | -------: | ------------------: |
| 16 hex | 372 µs | 581 µs | 0.64 (1.56× faster) |
| 256 hex | 4.7 ms | 8.0 ms | **0.59 (1.70× faster)** |
| 1,000 hex | 18.2 ms | 30.9 ms | 0.59 (1.70× faster) |
| 256 RGB | 4.7 ms | 6.8 ms | 0.69 (1.45× faster) |

**Preparation alone:** 283 µs (16 hex), 3.3 ms (256 hex), 12.8 ms (1,000 hex),
3.3 ms (256 RGB). That's about the cost of one ordinary call, which makes sense:
preparing does the per-entry conversion work that every one-shot call repeats.

**Preparation + N lookups vs N ordinary calls:**

| Palette | 1 query | 10 queries | 100 queries |
| ------- | ------: | ---------: | ----------: |
| 16 hex | 589 vs 584 µs (+1%) | 3.3 vs 5.2 ms (−37%) | 31.5 vs 51.8 ms (−39%) |
| 256 hex | 8.0 vs 8.0 ms (0%) | 50.6 vs 80.6 ms (−37%) | 460 vs 780 ms (−41%) |
| 256 RGB | — | 50.7 vs 69.1 ms (−27%) | — |

Break-even, from `preparation ÷ (one-shot − prepared lookup)`: **about 1 query**
at 256 hex, about 1.4 at 16 hex, about 1.6 at 256 RGB.

**Retained memory**, measured on Node 26.13.1 during development. CI records the
same measurement as GitHub Actions notices on every supported Node version.

| Palette | Per entry | Per 1,000 entries |
| ------- | --------: | ----------------: |
| hex strings | ~117–119 B | ~114 KiB |
| RGB objects | ~165 B (Lab value + frozen copy) | ~161 KiB |

Strings are shared with the caller's array, so they add nothing.

**Why memory isn't measured by CodSpeed:** its memory mode counts native
allocations. V8 places JavaScript objects on heap pages it already owns, so
`preparePalette (1000 hex)` reported **0 B**, and other results jumped between
the same few page-sized values (27.6 and 34.1 KB). The budget test measures V8
heap growth directly instead. It keeps the prepared palettes alive across the
measurement, because otherwise V8 collects them early and reports 0.

### Against the criteria

1. **Pass.** At 256 hex, a prepared lookup takes 0.59 of the one-shot time
   (target ≤ ⅔). RGB palettes are slightly under the bar at 0.69 (1.45×),
   because `findNearestRGBColour` has no strings to parse.
2. **Pass.** Preparation pays for itself after about 1 query at 256 entries
   (target ≤ 3).
3. **Pass.** About 117 B per hex entry and 165 B per RGB entry (target
   < 200 B).

## Decision

**Ship `preparePalette` in 5.0.0** (decided 2026-11-19). All three criteria
pass for hex palettes. RGB palettes miss criterion 1 only narrowly (1.45×
against 1.5×) and pass the other two, so they are included rather than given
a separate API.

- `preparePalette(palette)` is exported from the package root, along with the
  `PreparedPalette`, `PreparedEntry` and `PreparedRGBColour` types.
- The lookup accepts a string or an RGB object (`string | RGBColour`).
- Behaviour is as described in [The spike](#the-spike), unchanged.
- It ships in 5.0.0 rather than 5.1 because it is ready and follows the 5.0
  palette contract.

## Consequences

- Callers that match many colours against one palette can prepare it once.
  The README and the migration guide document when that helps.
- Ordinary `findNearest*` calls are unchanged and never allocate prepared state.
- `src/preparePalette.memory.test.ts` stays in the suite as a memory budget:
  it fails above 200 B per entry and posts the measurement as a GitHub Actions
  notice on each Node version.
- CodSpeed's memory mode was tried for this spike and reverted. It can't see
  the JavaScript heap, so the workflow is back to `simulation` only.
- `PreparedRGBColour` is a plain interface with `readonly` fields rather than
  `Readonly<RGBColour>`, because the declaration bundler (API Extractor) can't
  follow the built-in `Readonly` type.
