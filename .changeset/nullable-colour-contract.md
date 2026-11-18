---
"@sardine/colour": major
---

Make invalid input, parsing and precision consistent across the API (#495).

**Failable functions return `null`.** They no longer throw or return `undefined`:

- Previously threw: `convertCSSRGBtoRGB`, `convertCSSRGBtoHex`, `getContrastRatio`, `getContrastRatioFromCSSRGB`, `getContrastRatioFromNamedCSSColour`.
- Previously returned `undefined`: `convertNamedCSSColourtoHex`, `convertNamedCSSColourtoRGB`, `convertHextoNamedCSSColour`, `convertRGBtoNamedCSSColour`.

```ts
// v4
let rgb;
try { rgb = convertCSSRGBtoRGB(input); } catch { rgb = fallback; }
if (convertNamedCSSColourtoHex(name) === undefined) { /* … */ }

// v5
const rgb = convertCSSRGBtoRGB(input) ?? fallback;
if (convertNamedCSSColourtoHex(name) === null) { /* … */ }
```

**Predicates return `false` for invalid input.** `isDarkColour`, `isCSSRGBDarkColour` and `isCSSNamedDarkColour` no longer throw, which matches `isHexDarkColour`. To tell an invalid colour apart from a light one, call `parseColour` first.

**New `parseColour(value)`** returns an `RGBColour` or `null` for hex, CSS RGB and named CSS strings and for RGB objects. Finite out-of-range values are clamped. RGB objects with missing or non-finite channels are rejected.

**Numbers are no longer rounded for display:**

- Contrast ratios are unrounded instead of truncated to 3 decimals: `getContrastRatio("#777", "#fff")` returns `4.478089…`, not `4.478`. Use `ratio.toFixed(2)` (or similar) where you display it.
- Hex alpha is `byte / 255` instead of being rounded to 2 decimals: `convertHextoRGB("#00000080").A` is `0.50196…`, not `0.5`, and `#00000001` no longer collapses to `0`. `convertHextoCSSRGB` still prints the short CSS form (`rgba(0,0,0,0.5)`), and `convertRGBtoHex` still round-trips every byte.
- CSS percentage channels keep fractions: `rgb(50% 25% 100%)` parses to `{ R: 127.5, G: 63.75, B: 255 }`, not `{ R: 128, G: 64, B: 255 }`.

**CSS RGB values are clamped like CSS computed values.** `rgb(300, -10, 0)` parses to `{ R: 255, G: 0, B: 0 }`, and alpha is clamped to 0–1. When alpha is omitted, `convertCSSRGBtoRGB` now leaves `A` out instead of setting `A: undefined`, which matches `convertHextoRGB`.

**`getContrastRatio` measures RGB directly.** It no longer converts CSS RGB to hex first, so fractional channels give the same result as `getContrastRatioFromCSSRGB`.

**Types:**

- `RGBColour`, `LabColour`, `XYZColour`, `NamedCSSColour` and the new `PickHexColourContrastOptions` are exported from the package root.
- `isNamedCSSColour` accepts any `string` and narrows it to `NamedCSSColour`. Names are still matched exactly (lowercase).

The `findNearest*` functions keep their v4 results. Their contract is being decided separately (#496). The only change is that `findNearestCSSRGBColour` now skips invalid entries and returns an invalid target unchanged instead of throwing, like `findNearestHexColour` already did.
