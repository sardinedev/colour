---
"@sardine/colour": patch
---

Add missing CSS named colours `orange` and `rebeccapurple`

Both colours are valid [CSS named colours](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color) but were absent from the `NamedCSSColour` type union and the `namedCSSColours` lookup map. This caused `isNamedCSSColour("orange")` to return `false`, and functions like `convertNamedCSSColourtoHex` and `findNearestColour` to silently fail for inputs or palettes containing these colours.

Fixes #320
