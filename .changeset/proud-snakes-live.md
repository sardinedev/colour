---
"@sardine/colour": patch
---

perf: Deduplicate MDN named-colour URL across error messages

The MDN URL `https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`
appeared 4 times as a hardcoded string literal across `getContrastRatio`,
`getContrastRatioFromNamedCSSColour`, and `isCSSNamedDarkColour`. Each
module previously included its own copy in the bundle. It is now a shared
constant (`NAMED_CSS_COLOUR_URL`) in `src/util/index.ts`, which Rollup
deduplicates to a single string reference in the output.

Error messages were also flattened from multiline template literals
(which embedded `\n\t` whitespace into the actual strings) to single-line,
removing the extra whitespace characters from the bundle.
No behaviour change.
