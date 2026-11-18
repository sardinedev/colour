---
"@sardine/colour": patch
---

Fix `isCSSRGBDarkColour` (and `isDarkColour` with CSS RGB input) using a different darkness threshold from the hex and named-colour helpers. Colours with relative luminance between about 0.179 and 0.229, such as `rgb(128, 128, 128)`, are no longer reported as dark.
