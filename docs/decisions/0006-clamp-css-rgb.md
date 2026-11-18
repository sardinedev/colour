# 0006. Clamp CSS RGB values like CSS computed values

- Status: Accepted
- Date: 2026-11-18
- Issue: #495 (tracker #490), decision D8
- Implemented in: `feat/issue-495-contract`

## Context

The CSS RGB pattern accepts signed numbers and percentages of any size, and v4
returned them unchanged: `rgb(300, -10, 0)` parsed to `{ R: 300, G: -10, B: 0 }`
and alpha `1.5` stayed `1.5`. Those values then fed luminance and Lab maths
outside their valid range, and `parseColour` was going to clamp the same inputs,
so the two parse paths would have disagreed.

## Decision

`convertCSSRGBtoRGB` clamps finite out-of-range values the way CSS computes
them: RGB channels (numbers or percentages) to 0–255 and alpha (number or
percentage) to 0–1. Values already in range, fractional or not, are unchanged.
Because the clamping happens in this shared leaf parser, every CSS RGB path
gets it: `convertCSSRGBtoHex`, the contrast functions, darkness predicates,
palette matching and `parseColour`.

## Consequences

- `rgb(300, 300, 300)` is treated as white, so its contrast with black is `21`.
- When alpha is omitted, `A` is left out of the result instead of being set to
  `A: undefined`. This matches `convertHextoRGB` and `parseColour`. Code that
  checks `"A" in rgb` or uses strict object equality will notice the
  difference.
- This is not a CSS grammar change: the same strings are accepted or rejected
  as before.
