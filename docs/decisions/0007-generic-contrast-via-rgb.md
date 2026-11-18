# 0007. Generic contrast measures RGB directly

- Status: Accepted
- Date: 2026-11-18
- Issue: #495 (tracker #490), decision D10
- Implemented in: `feat/issue-495-contract`

## Context

`getContrastRatio` normalized every operand to a hex string and then delegated
to `getContrastRatioFromHex`. Once fractional CSS percentages are kept
([0005](0005-full-numeric-precision.md)), that hex step would quantize them, so
`getContrastRatio("rgb(50.2% …)", …)` and `getContrastRatioFromCSSRGB` would
return different ratios for the same input. #498 also flagged the
CSS RGB → hex → RGB conversions as wasted work.

## Decision

`getContrastRatio` parses each string operand to RGB with `parseColour`
([0004](0004-parse-colour.md)), computes the WCAG 2.x relative luminance from
those channels, and returns the unrounded ratio. Non-string operands, including
RGB objects, return `null`, because this function's API is string-only.

## Consequences

- Generic and format-specific contrast functions agree for every supported
  input.
- The hex and named-colour paths give the same results as before, apart from
  the precision changes in [0005](0005-full-numeric-precision.md).
- Accepting RGB objects in `getContrastRatio` would be a separate, additive
  decision.
