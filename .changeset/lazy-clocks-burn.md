---
"@sardine/colour": minor
---

perf: Precompute colour info in `sortHexColours` to avoid redundant conversions

`getColorInfo` (which runs `convertHextoRGB` + `convertRGBtoHSV`) was
being called inside each sort comparator, resulting in O(n log n)
hex→RGB→HSV conversion chains. All colour info is now computed once
upfront into a `Map` before sorting, reducing conversions from ~n log n
down to exactly n.
No behaviour change.
