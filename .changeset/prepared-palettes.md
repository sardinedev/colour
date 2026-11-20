---
"@sardine/colour": minor
---

Add `preparePalette(palette)`, which parses a palette once and returns a lookup function for matching many colours against it. Results follow the `findNearest*` rules; RGB entries come back as frozen copies.
