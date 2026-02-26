---
"@sardine/colour": patch
---

perf: Replace `.match()` with `.test()` for hex and CSS RGB validation

`isHexColour`, `isCSSRGBColour`, and `convertHextoRGB` were using
`.match()` for boolean checks, which allocates a match result array
that was immediately discarded. Switching to `.test()` avoids that
allocation on every colour validation call.
No behaviour change.
