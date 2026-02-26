---
"@sardine/colour": minor
---

perf: Use a single regex to validate hexadecimal colours

Replace four separate hex regex checks with a single combined regex
(`hexAnyRegex`) and branch on string length in `convertHextoRGB`.
No behaviour change — purely an internal optimisation that reduces
the number of regex evaluations on every hex colour validation.
