---
"@sardine/colour": patch
---

perf: Replace `Number.parseInt` + template literals with `parseInt` + `slice` in `convertHextoRGB`

`Number.parseInt` is a property access on `Number`; the global `parseInt`
is identical and terser. Template literals for 2-character channel
extraction (e.g. `` `${hex[1]}${hex[2]}` ``) allocated two single-char
strings plus the result string. Using `hex.slice(1, 3)` allocates a
single string directly. For the short-hex doubling case (e.g. `` `${hex[1]}${hex[1]}` ``),
`hex.slice(1, 2).repeat(2)` is used instead — `slice` always returns
`string` (safe under `noUncheckedIndexedAccess`) and avoids index access entirely.
No behaviour change.
