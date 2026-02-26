---
"@sardine/colour": minor
---

perf: Hoist repeated constant expressions in `constrainLab`, `bigSquare`, and `toRadians`

`constrainLab`, `bigSquare`, and `toRadians` were recomputing the same
literal expressions (`6/29`, `(6/29)**3`, `3*(6/29)**2`, `25**7`,
`Math.PI/180`) on every call. These are now module-level constants,
computed once at load time. No behaviour change.

These functions sit on the hot path of `convertRGBtoLab` →
`RGBdistance` → every `findNearest*` loop iteration, so the saving
compounds with palette size.
