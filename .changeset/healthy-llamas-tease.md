---
"@sardine/colour": patch
---

fix: `convertCSSRGBtoRGB` now returns the alpha channel as `undefined` instead of `NaN` if no alpha is present in CSS RGB function
