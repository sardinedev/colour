# 0010. Prepared palettes for repeated matching

- Status: Proposed. Awaiting CodSpeed measurements.
- Date: 2026-11-19
- Issue: #499 (tracker #490)
- Implemented in: `spike/issue-499-prepared-palettes` (spike, not exported)

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

All measurements come from CodSpeed, using `bench/preparePalette.bench.ts`.
The workflow now runs `simulation,memory`.

| Workload | Palettes |
| -------- | -------- |
| Preparation alone | 16, 256 and 1,000 hex; 256 RGB |
| One lookup, prepared vs one-shot | 16, 256 and 1,000 hex; 256 RGB |
| Preparation + 1/10/100 lookups vs 1/10/100 one-shot calls | 16 and 256 hex |
| Preparation + 10 lookups vs 10 one-shot calls | 256 RGB |
| Retained memory | allocations during preparation, from memory mode |

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

## Decision

Pending the CodSpeed run on the spike PR.

## Consequences

To be filled in with the decision. Either way, the spike's benchmarks and the
CodSpeed memory mode stay useful for future palette work. If the API is
deferred, `src/preparePalette.ts` and its tests are removed before merge.
