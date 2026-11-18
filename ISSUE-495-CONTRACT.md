# #495 v5 contract: nullable APIs, parsing and numeric precision

Status: **accepted** (2026-11-18). All decisions D1–D10 approved. Behaviour in the "Before"
columns was probed against a fresh production build of `main` @ a31ee18.

## Decisions

| # | Decision | Recommendation | Status |
| - | -------- | -------------- | ------ |
| D1 | Failable conversions, lookups and calculations return `T \| null`; never throw on bad input, never return `undefined` | Accept | **accepted** |
| D2 | Predicates return `false` for invalid input (never throw) | Accept | **accepted** |
| D3 | Export public types from the root | Accept | **accepted** |
| D4 | Widen `isNamedCSSColour` input to `string`, keep `colour is NamedCSSColour` narrowing; names stay exact/lowercase | Accept | **accepted** |
| D5 | Return unrounded contrast ratios | Accept | **accepted** |
| D6 | Keep hex alpha as unrounded `byte / 255`; quantize only when serializing | Accept | **accepted** |
| D7 | Keep CSS percentage channels fractional (`50.2%` → `128.01`, not `128`) | Accept | **accepted** |
| D8 | Clamp finite out-of-range CSS RGB channels/alpha in the shared parser (`rgb(300,0,0)` → `R: 255`) | Accept (matches CSS computed-value clamping) | **accepted** |
| D9 | Add `parseColour(unknown): RGBColour \| null` | Ship in 5.0 | **accepted for 5.0** |
| D10 | Generic `getContrastRatio` dispatches straight to RGB (no CSS RGB → hex → RGB detour) | Accept (required by D7, or the generic and CSS paths disagree) | **accepted** |

## Before / after

Legend: kernel = valid-input numeric function, no validation added (documented
precondition instead).

### Assertions

| Function | Before | After |
| -------- | ------ | ----- |
| `isHexColour(string)` | `boolean` | unchanged |
| `isCSSRGBColour(string)` | `boolean` | unchanged |
| `isNamedCSSColour(NamedCSSColour)` | `colour is NamedCSSColour`; input typed as the union | input `string`, same guard (D4) |

### Conversions

| Function | Before (invalid input) | After |
| -------- | ---------------------- | ----- |
| `convertHextoRGB` | `null`; alpha rounded to 2dp (`#00000001` → `A: 0`) | `null`; `A = byte/255` (D6) |
| `convertHextoCSSRGB` | `null`; alpha rounded to 2dp (zero-alpha bug fixed in #535) | `null`; zero alpha kept; alpha serialized per D6 note |
| `convertHextoNamedCSSColour` | `undefined`; exact string match only (`#F0F8FF`, `#fff` miss) | `null`; matching rule unchanged (exact lowercase 6-digit), first alias wins |
| `convertNamedCSSColourtoHex` | `undefined` | `null` |
| `convertNamedCSSColourtoRGB` | `undefined` | `null` |
| `convertCSSRGBtoRGB` | **throws** `Error`; percentages rounded; no clamping | `null`; fractional (D7); clamped (D8) |
| `convertCSSRGBtoHex` | **throws** `Error` | `null` |
| `convertRGBtoNamedCSSColour` | `undefined` | `null` |
| `convertRGBtoHex`, `convertRGBtoCSSRGB` | kernel | unchanged |
| `convertRGBtoXYZ`, `convertXYZtoLab`, `convertRGBtoLab` | kernel | unchanged |

### Contrast and luminance

| Function | Before (invalid input) | After |
| -------- | ---------------------- | ----- |
| `getContrastRatio` | **throws** `Error` (and `TypeError` on non-strings); truncated to 3dp | `number \| null`; unrounded (D5); direct RGB path (D10) |
| `getContrastRatioFromHex` | `null`; truncated | `null`; unrounded |
| `getContrastRatioFromCSSRGB` | **throws** `Error`; truncated | `null`; unrounded |
| `getContrastRatioFromNamedCSSColour` | **throws** despite `number \| null` signature; truncated | `null`; unrounded |
| `getSRGBLuminanceFromHex` | `null` (inferred return type) | `number \| null`, explicit return type |
| `getSRGBLuminanceFromRGB` | kernel (`NaN` in → `NaN` out) | unchanged |
| `pickHexColourContrast` | `null`; ties → option two | unchanged |

### Predicates

| Function | Before (invalid input) | After |
| -------- | ---------------------- | ----- |
| `isHexDarkColour` | `false` | unchanged |
| `isCSSRGBDarkColour` | **throws** (threshold fixed in #536) | `false` |
| `isCSSNamedDarkColour` | **throws** | `false` |
| `isDarkColour` | **throws** | `false` |

Callers that need to distinguish "invalid" from "not dark" should parse first
(`parseColour`, accepted for 5.0).

### Out of scope here

- `findNearest*`: result contract is #496.
- `sortHexColours`: silently drops invalid entries; unchanged, document it.
- `ciede2000`, `RGBdistance`: kernels; unchanged.
- Alpha-aware contrast: #497.

## Public types (D3)

Export from the root: `RGBColour`, `LabColour`, `XYZColour`, `NamedCSSColour`,
plus a named options type for `pickHexColourContrast` (currently the private
`ColorArgs`). Keep private: `HueHelper` (util-internal), `HSVColour`
(`convertRGBtoHSV` is not exported), `NamedCSSColours`. Delete `ColourSpace`
(unused).

## Precision notes

- **D6 serialization.** With unrounded alpha, `convertHextoCSSRGB("#00000080")`
  would print `0.5019607843137255`. Serialize alpha the way CSS does: the
  shortest of 2 or 3 decimals that maps back to the same byte (`0x80` → `0.5`).
  `convertRGBtoHex` already quantizes (since #532).
- **D5.** Truncation never rounds up, so it was conservative at thresholds such as
  4.5. Unrounded values stay correct at thresholds; display rounding becomes the
  consumer's job. Black/white stays exactly `21`.
- **D7 + D10.** With fractional channels, a CSS → hex detour would quantize and
  make `getContrastRatio("rgb(50.2% …)")` differ from
  `getContrastRatioFromCSSRGB` with the same input.

## Implementation notes

- Percentages are computed as `percentage * 255 / 100` so exact inputs stay exact
  (`2%` gives `5.1`, not `5.1000000000000005`); otherwise float noise leaks into
  CSS strings re-serialized by `findNearestCSSRGBColour`.
- With alpha omitted, `convertCSSRGBtoRGB` leaves `A` out instead of returning
  `A: undefined`, matching `convertHextoRGB` and `parseColour`.
- `findNearestCSSRGBColour` no longer throws: like `findNearestHexColour`, it skips
  invalid entries and returns an invalid target unchanged. Everything else about
  `findNearest*` results stays for #496.

## Bugs found while drafting

Fixed separately as patch releases before the contract work:

1. `convertHextoCSSRGB` dropped zero alpha (`#00000000` → `rgb(0,0,0)`): #535.
2. `isCSSRGBDarkColour` omitted the `+ 0.05` flare term, disagreeing with
   `isHexDarkColour` for luminance ≈ 0.179–0.229: #536.

## Migration examples (for the 5.0 notes)

```ts
// v4
try { rgb = convertCSSRGBtoRGB(input); } catch { rgb = fallback; }
// v5
const rgb = convertCSSRGBtoRGB(input) ?? fallback;

// v4: undefined on miss
if (convertNamedCSSColourtoHex(name) === undefined) { … }
// v5: null on miss
if (convertNamedCSSColourtoHex(name) === null) { … }

// v4: ratio truncated to 3dp
getContrastRatio("#777", "#fff"); // 4.478
// v5: unrounded; format for display yourself
getContrastRatio("#777", "#fff")?.toFixed(2);
```

## Implementation order after approval

1. ~~Patch PRs for the two bugs~~ (done: #535, #536).
2. Shared leaf parsing: fractional percentages, clamping, unrounded hex alpha,
   CSS alpha serialization. Tests cover all 256 long-hex alpha bytes, the 16
   shorthand alpha values, percentage fractions, and omitted/0/1 alpha.
3. Null propagation through converters, contrast and predicates, with colocated
   tests for both contrast operands and exact lookup misses.
4. Root type exports, plus `isNamedCSSColour` widening with type tests.
5. `parseColour` (D9, accepted for 5.0).
6. Major changeset with the migration examples; re-run palette and contrast
   benchmarks against the new behaviour before any further optimization.
