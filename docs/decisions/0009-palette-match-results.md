# 0009. Palette matching returns the original palette entry, or `null`

- Status: Accepted
- Date: 2026-11-18
- Issue: #496 (tracker #490); also resolves #323
- Implemented in: `feat/issue-496-palette-results`

## Context

The five `findNearest*` functions all rank candidates by CIEDE2000, but they
disagree on what they return and when. Probed against `main` at `c8cb2a2`:

**The result is often not a member of the palette.** Results are rebuilt from
RGB and re-serialized in the *target's* format:

| Call | Returns | In the palette? |
| ---- | ------- | --------------- |
| `findNearestHexColour("#f00", ["#FA0000", "#000"])` | `"#fa0000"` | no (case) |
| `findNearestHexColour("#f00", ["#f00", "#000"])` | `"#ff0000"` | no (shorthand) |
| `findNearestCSSRGBColour("rgb(255,0,0)", ["rgb(250, 0, 0)", …])` | `"rgb(250 0 0)"` | no (syntax) |
| `findNearestNamedCSSColour("cyan", ["cyan", "red"])` | `"aqua"` | no (alias) |
| `findNearestNamedCSSColour("grey", ["grey", "red"])` | `"gray"` | no (alias) |
| `findNearestColour("#f00", ["red", "blue"])` | `"#ff0000"` | no (target format) |
| `findNearestColour("rgb(0 0 0)", ["#00000080", "#ffffff"])` | `"rgb(0 0 0 / 0.5019607843137255)"` | no |
| `findNearestColour("red", ["#fa0000", "#00f"])` | `undefined` | — (nearest has no name) |

**Edge cases differ by function**, and the fallback hides failure by returning
the target:

| Case | Hex | CSS RGB | Named | Generic | RGB |
| ---- | --- | ------- | ----- | ------- | --- |
| Missing or empty palette | target | target | target | target | target |
| One valid entry | target | target | target | target | target |
| Invalid target | target | target | target | `undefined` | target (NaN distances) |
| All entries invalid | target, normalized (`#ff0000`) | target, normalized | target | target | target |
| One valid among invalid | **target**, normalized | **target**, normalized (`rgb(255 0 0)`) | target | target | — |

What already works and should stay:

- Equal distances keep the first candidate (strict `<`).
- `findNearestRGBColour` returns the matching palette object by identity.
- Distance ignores alpha on both sides.

There are no callers inside the library; only tests and benchmarks use these
functions. Existing tests deliberately assert the fallback and the normalized
output, so this is an intentional breaking change.

## Decision

**P1. Failure returns `null`.** An invalid target, a missing or empty palette,
or a palette with no valid candidate returns `null`. A palette with exactly one
valid candidate returns that candidate. This follows the convention in
[0003](0003-failable-apis-return-null.md).

**P2. Invalid candidates are skipped, consistently.** Each function accepts its
own format only:

- Hex: hex strings.
- CSS RGB: CSS RGB strings.
- Named: exact named colours.
- RGB: objects that `parseColour` accepts (finite `R`, `G` and `B`; alpha
  missing or finite).
- Generic: any string `parseColour` accepts.

**P3. The result is the original palette entry.** Strings are returned exactly
as given, so case, shorthand, commas, percentages and aliases are preserved. RGB
objects are returned by identity. A mixed palette in `findNearestColour` can
return a different format from the target's.

**P4. Ties keep the first candidate.** Equal distances, including duplicates,
return the earliest entry.

**P5. The distance is unchanged.** CIEDE2000 on sRGB, ignoring alpha on both
sides. Out-of-range RGB object channels are clamped for the distance only, as in
[0004](0004-parse-colour.md); the original object is still returned. Matching by
rendered appearance requires compositing first; see #497.

**P6. Types preserve the palette's element type and accept readonly arrays.**
For example, `findNearestHexColour<T extends string>(colour: string, palette:
readonly T[]): T | null`, and `findNearestRGBColour<T extends RGBColour>(…):
T | null`, so literal unions and RGB subtypes come back unchanged. Inputs are
never mutated.

**P7. No other changes.** No new distance metric, approximate search, cache or
implicit preparation. One linear scan per call that tracks the best index; no
intermediate arrays and no output serialization.

### Before / after

| Function | Return type before | Return type after |
| -------- | ------------------ | ----------------- |
| `findNearestColour` | `string \| NamedCSSColour \| undefined` | `T \| null` |
| `findNearestHexColour` | `string` | `T \| null` |
| `findNearestCSSRGBColour` | `string` | `T \| null` |
| `findNearestNamedCSSColour` | `NamedCSSColour` | `T \| null` (`T extends NamedCSSColour`) |
| `findNearestRGBColour` | `RGBColour` | `T \| null` (`T extends RGBColour`) |

| Call | v5.0 before this change | After |
| ---- | ----------------------- | ----- |
| `findNearestHexColour("#f00", ["#FA0000", "#000"])` | `"#fa0000"` | `"#FA0000"` |
| `findNearestHexColour("#f00", ["#00f"])` | `"#f00"` | `"#00f"` |
| `findNearestHexColour("#f00", [])` | `"#f00"` | `null` |
| `findNearestHexColour("nope", ["#000", "#fff"])` | `"nope"` | `null` |
| `findNearestHexColour("#f00", ["#fa0000", "bogus"])` | `"#ff0000"` | `"#fa0000"` |
| `findNearestNamedCSSColour("cyan", ["cyan", "red"])` | `"aqua"` | `"cyan"` |
| `findNearestColour("#f00", ["red", "blue"])` | `"#ff0000"` | `"red"` |
| `findNearestColour("red", ["#fa0000", "#00f"])` | `undefined` | `"#fa0000"` |
| `findNearestRGBColour(t, [onlyEntry])` | `t` | `onlyEntry` |

## Consequences

- **Migration:**
  - Handle `null` where v4 handed back the target, for example
    `findNearestHexColour(c, palette) ?? c` to keep the old fallback.
  - If you need the result in a particular format, convert it explicitly, for
    example `const rgb = parseColour(result); if (rgb) convertRGBtoHex(rgb)`.
- Every non-null result is a member of the palette, which tests assert directly.
- Removing output serialization and intermediate arrays should make matching
  cheaper. Benchmark the accepted contract before any further optimization
  (#491); don't count the removed serialization as an optimization win.
- The prepared-palette spike (#499, draft #534) must follow this contract.
  Draft #534 also touches `convertCSSRGBtoRGB`, which #537 rewrote, so it needs
  a rebase.
- The JSDoc for all five functions is rewritten, including the missing
  `findNearestNamedCSSColour` comment from #323. #323's suggested wording
  documents the old fallback and is not reused.
