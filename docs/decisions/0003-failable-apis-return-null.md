# 0003. Failable APIs return `null`; predicates return `false`

- Status: Accepted
- Date: 2026-11-18
- Issue: #495 (tracker #490), decisions D1 and D2
- Implemented in: `feat/issue-495-contract`

## Context

v4 had three conventions for the same situation. The hex-facing functions
returned `null`. The CSS RGB and generic functions threw. The exact named-colour
lookups returned `undefined`. Some types were wrong as well:
`getContrastRatioFromNamedCSSColour` was typed `number | null` but threw, and
`getContrastRatio` threw a `TypeError` for non-string input. Among the darkness
predicates, `isHexDarkColour` returned `false` for invalid input while the CSS
RGB, named and generic predicates threw.

## Decision

- Every failable string conversion, lookup and calculation returns its value or
  `null`. It never throws on bad input and never returns `undefined`. That
  includes exact named-colour misses.
- Predicates stay `boolean` and return `false` for invalid input. Callers who
  need to tell "invalid" apart from "not dark" parse first ([0004](0004-parse-colour.md)).
- Valid-input numeric kernels (`convertRGBtoHex`, `convertRGBtoCSSRGB`,
  `convertRGBtoXYZ`, `convertXYZtoLab`, `convertRGBtoLab`,
  `getSRGBLuminanceFromRGB`, `ciede2000`, `RGBdistance`) are not validated.
  Their valid-input precondition is documented, so hot loops don't repeat
  validation.
- No `Result` type or error framework.

| Function | v4 on invalid input | v5 |
| -------- | ------------------- | -- |
| `convertCSSRGBtoRGB` | throws | `null` |
| `convertCSSRGBtoHex` | throws | `null` |
| `convertNamedCSSColourtoHex` | `undefined` | `null` |
| `convertNamedCSSColourtoRGB` | `undefined` | `null` |
| `convertHextoNamedCSSColour` | `undefined` | `null` |
| `convertRGBtoNamedCSSColour` | `undefined` | `null` |
| `getContrastRatio` | throws (`TypeError` on non-strings) | `null` |
| `getContrastRatioFromCSSRGB` | throws | `null` |
| `getContrastRatioFromNamedCSSColour` | throws, despite `number \| null` | `null` |
| `getSRGBLuminanceFromHex` | `null` (inferred type) | `null`, explicit `number \| null` |
| `convertHextoRGB`, `convertHextoCSSRGB`, `getContrastRatioFromHex`, `pickHexColourContrast` | `null` | unchanged |
| `isCSSRGBDarkColour`, `isCSSNamedDarkColour`, `isDarkColour` | throws | `false` |
| `isHexDarkColour` | `false` | unchanged |

## Consequences

- Migration: replace `try`/`catch` with `?? fallback` or a `null` check, and
  `=== undefined` with `=== null`.
- `sortHexColours` keeps silently dropping invalid entries.
- The `findNearest*` result contract is out of scope here; it is decided in
  [0009](0009-palette-match-results.md) (#496). Under 0009, no `findNearest*`
  function throws, and an invalid target returns `null`.
- The three darkness predicates share one threshold helper, so the format
  inconsistency fixed in #536 can't come back.
