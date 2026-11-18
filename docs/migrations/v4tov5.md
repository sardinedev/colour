# Migrating from v4 to v5

Version 5 has four breaking changes:

1. The package is ESM only.
2. WCAG standard arguments are gone.
3. Invalid input returns `null` (or `false` from predicates) instead of throwing.
4. Numbers are no longer rounded for display.

It also adds `parseColour` and exports the public types from the package root.

Checklist:

- [ ] Replace `require("@sardine/colour")` with `import` ([ESM only](#esm-only)).
- [ ] Remove every `"WCAG2.1"` / `"WCAG3.0"` argument ([WCAG standard arguments](#wcag-standard-arguments)).
- [ ] Replace `try`/`catch` and `=== undefined` checks with `null` checks ([Invalid input](#invalid-input-returns-null)).
- [ ] Format contrast ratios and alpha where you display them ([Precision](#numbers-are-no-longer-rounded)).
- [ ] Update tests that compare exact parsed objects or rounded numbers.

The reasoning behind each change is in [`docs/decisions`](../decisions/README.md).

## ESM only

CommonJS builds and the `require` export condition are removed
([0001](../decisions/0001-esm-only-distribution.md)).

```js
// v4
const { convertHextoRGB } = require("@sardine/colour");

// v5
import { convertHextoRGB } from "@sardine/colour";

// v5 from CommonJS, where practical
const { convertHextoRGB } = await import("@sardine/colour");
```

If your project can't use ESM or asynchronous `import()`, stay on 4.x.

## WCAG standard arguments

All functions use one WCAG 2.x calculation, and the `standard` argument is
removed ([0002](../decisions/0002-wcag-2x-only.md)). The `WCAG` type is gone too.

```ts
// v4
getContrastRatio("red", "#00FF00", "WCAG2.1");
pickHexColourContrast({ backgroundColour, optionOneColour, optionTwoColour }, "WCAG2.1");

// v5
getContrastRatio("red", "#00FF00");
pickHexColourContrast({ backgroundColour, optionOneColour, optionTwoColour });
```

Affected functions: `getContrastRatio`, `getContrastRatioFromHex`,
`getContrastRatioFromCSSRGB`, `getContrastRatioFromNamedCSSColour`,
`getSRGBLuminanceFromHex`, `getSRGBLuminanceFromRGB`, `isDarkColour`,
`isHexDarkColour`, `isCSSRGBDarkColour`, `isCSSNamedDarkColour` and
`pickHexColourContrast`.

v5 always uses the sRGB breakpoint `0.04045`, which is what v4's `"WCAG3.0"`
mode used. v4's `"WCAG2.1"` mode used `0.03928`. For integer 0–255 channels
the two give identical results. Only fractional channel values between about
10.02 and 10.31 differ.

## Invalid input returns `null`

Functions that can fail return `null` instead of throwing or returning
`undefined` ([0003](../decisions/0003-failable-apis-return-null.md)).

| Function | v4 | v5 |
| -------- | -- | -- |
| `convertCSSRGBtoRGB` | throws | `null` |
| `convertCSSRGBtoHex` | throws | `null` |
| `getContrastRatio` | throws | `null` |
| `getContrastRatioFromCSSRGB` | throws | `null` |
| `getContrastRatioFromNamedCSSColour` | throws | `null` |
| `convertNamedCSSColourtoHex` | `undefined` | `null` |
| `convertNamedCSSColourtoRGB` | `undefined` | `null` |
| `convertHextoNamedCSSColour` | `undefined` | `null` |
| `convertRGBtoNamedCSSColour` | `undefined` | `null` |

`convertHextoRGB`, `convertHextoCSSRGB`, `getContrastRatioFromHex`,
`getSRGBLuminanceFromHex` and `pickHexColourContrast` already returned `null`
and are unchanged.

```ts
// v4
let rgb;
try {
	rgb = convertCSSRGBtoRGB(input);
} catch {
	rgb = fallback;
}
if (convertNamedCSSColourtoHex(name) === undefined) {
	/* … */
}

// v5
const rgb = convertCSSRGBtoRGB(input) ?? fallback;
if (convertNamedCSSColourtoHex(name) === null) {
	/* … */
}
```

The return types are now nullable, so TypeScript points out each call site
that needs a check.

### Predicates return `false`

`isDarkColour`, `isCSSRGBDarkColour` and `isCSSNamedDarkColour` return `false`
for invalid input instead of throwing, matching `isHexDarkColour`.
`isDarkColour` accepts exactly the strings `parseColour` accepts, so uppercase
`RGB(0, 0, 0)` is now evaluated; in v4 it threw. To tell an invalid colour
apart from a light one, parse it first:

```ts
const rgb = parseColour(input);
if (rgb === null) {
	// invalid colour
} else if (isDarkColour(input)) {
	// dark
}
```

### Palette matching

The way the `findNearest*` functions pick and return a result is unchanged in
v5.0.0; that contract is being decided in #496. Two things do change:

- `findNearestCSSRGBColour` no longer throws. Like `findNearestHexColour`, it
  now skips invalid palette entries and returns an invalid target unchanged.
- Results are re-serialized from the parsed colour, so they show the precision
  changes below. For example, `findNearestCSSRGBColour` can return
  `rgb(127.5 0 0)` where v4 returned `rgb(128 0 0)`, and `findNearestHexColour`
  keeps `#00000001` where v4 returned `#00000000`.

## New: `parseColour`

`parseColour(value)` accepts hex, CSS RGB and named CSS strings and RGB
objects, and returns a new `RGBColour` or `null`
([0004](../decisions/0004-parse-colour.md)).

```ts
import { parseColour } from "@sardine/colour";

parseColour("#ff000080"); //=> { R: 255, G: 0, B: 0, A: 0.5019607843137255 }
parseColour("rgb(50% 0 0)"); //=> { R: 127.5, G: 0, B: 0 }
parseColour({ R: 300, G: 0, B: 0 }); //=> { R: 255, G: 0, B: 0 } (clamped)
parseColour({ R: Number.NaN, G: 0, B: 0 }); //=> null
parseColour("not-a-colour"); //=> null
```

## Numbers are no longer rounded

Values keep full precision. Rounding happens only when writing a hex or CSS
string ([0005](../decisions/0005-full-numeric-precision.md)).

| Value | v4 | v5 |
| ----- | -- | -- |
| `getContrastRatio("#777", "#fff")` | `4.478` (truncated) | `4.478089453577214` |
| `convertHextoRGB("#00000080").A` | `0.5` | `0.5019607843137255` (`128 / 255`) |
| `convertHextoRGB("#00000001").A` | `0` | `0.00392156862745098` (`1 / 255`) |
| `convertCSSRGBtoRGB("rgb(50% 25% 100%)")` | `{ R: 128, G: 64, B: 255, A: undefined }` | `{ R: 127.5, G: 63.75, B: 255 }` |

- **Contrast ratios:** format them when you display them, for example
  `ratio.toFixed(2)`. Threshold checks such as `ratio >= 4.5` work as before.
  Truncation never rounded up, so no pair that failed in v4 passes in v5.
- **Hex alpha:** `convertHextoCSSRGB` still prints the short form browsers use
  (`#00000080` becomes `rgba(0,0,0,0.5)`), and `convertRGBtoHex` round-trips
  every alpha byte.
- **CSS percentages:** `convertRGBtoCSSRGB` and `findNearestCSSRGBColour` can
  now print fractional channels, such as `rgb(127.5 0 0)`. That's valid CSS.

## CSS RGB values are clamped

`convertCSSRGBtoRGB`, and every function built on it, clamps out-of-range values
the way browsers do: channels to 0–255 and alpha to 0–1
([0006](../decisions/0006-clamp-css-rgb.md)).

```ts
convertCSSRGBtoRGB("rgba(300, -10, 0, 1.5)");
// v4: { R: 300, G: -10, B: 0, A: 1.5 }
// v5: { R: 255, G: 0, B: 0, A: 1 }
```

When alpha is omitted, the result no longer has an `A` key. v4 returned
`A: undefined`. Missing alpha still means opaque. This matters if you use
`"A" in rgb` or strict equality in tests, for example `toStrictEqual`.

## `getContrastRatio` measures RGB directly

`getContrastRatio` no longer converts CSS RGB to hex first, so it gives exactly
the same result as `getContrastRatioFromCSSRGB` for fractional channels
([0007](../decisions/0007-generic-contrast-via-rgb.md)). Hex and named colours
behave as before, apart from the precision change above.

## Types

These types are now exported from the package root
([0008](../decisions/0008-public-types-and-named-colour-guard.md)):

```ts
import type {
	LabColour,
	NamedCSSColour,
	PickHexColourContrastOptions,
	RGBColour,
	XYZColour,
} from "@sardine/colour";
```

- `PickHexColourContrastOptions` is the argument type of `pickHexColourContrast`.
- `isNamedCSSColour` accepts any `string` and narrows it to `NamedCSSColour`.
  Remove any `@ts-expect-error` or casts you used to pass plain strings to it.
  Names are still matched exactly, so `"Red"` is not a named colour.
- The `WCAG` and `ColourSpace` types are removed.

## Fixes that change results

These bug fixes also ship in 5.0.0 and can change output you relied on:

- `isCSSRGBDarkColour`, and `isDarkColour` with CSS RGB input, used a different
  threshold from the hex and named versions. Colours with relative luminance
  between about 0.179 and 0.229, such as `rgb(128, 128, 128)`, are no longer
  reported as dark (#536).
- `convertHextoCSSRGB` kept fully transparent hex colours as opaque:
  `#00000000` became `rgb(0,0,0)`. It now returns `rgba(0,0,0,0)` (#535).
- `convertRGBtoHex` and `convertRGBtoCSSRGB` dropped an explicit `A: 0`, and
  `convertRGBtoHex` produced invalid hex for fractional channels. Channels are
  now clamped and rounded to bytes in hex, and zero alpha is kept (#532).
