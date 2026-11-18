# 0002. One WCAG 2.x calculation, no standard selection

- Status: Accepted, implemented
- Date: 2026-10-19
- Issue: #493 (tracker #490)
- Implemented in: #531

## Context

Contrast, luminance, darkness and colour-picking functions accepted a `WCAG`
standard argument. Internally this only switched the sRGB linearization
threshold between the historical `0.03928` and the current `0.04045`. It was
not a separate WCAG 3 contrast algorithm, and the WCAG 3 draft has not settled
on one. Related: #321, which proposed making the argument required.

## Decision

- Use one WCAG 2.x calculation with the current sRGB breakpoint `0.04045`.
- Remove the `WCAG` union, every standard/version parameter, argument
  forwarding and the internal threshold selector from all eleven affected
  functions.
- No deprecated overloads, unused optional arguments, compatibility aliases,
  feature flags or a replacement single-value standard type.
- No WCAG 3 or APCA implementation.

## Consequences

- Calls drop the standard argument, for example
  `getContrastRatio(foreground, background)` and `isDarkColour(colour)`.
  Type-level tests reject the old argument.
- v4 accepted `"WCAG2.1"` (threshold `0.03928`) or `"WCAG3.0"` (threshold
  `0.04045`). v5 always uses `0.04045`. Results differ from v4's `"WCAG2.1"`
  mode only for fractional channel values between about 10.02 and 10.31. Integer
  8-bit channels give the same result.
- Any future alpha-aware contrast (#497) must not reintroduce standard,
  version or algorithm selection.
