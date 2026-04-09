---
"@sardine/colour": major
---

## Breaking: validation errors now return `null` (or `false`) instead of throwing

Several public functions no longer throw on invalid input. Instead they return a sentinel value, allowing callers to handle errors without `try/catch`.

### What changed

| Function | Before | After |
|---|---|---|
| `convertHextoRGB` | threw `Error` | returns `null` |
| `convertHextoCSSRGB` | threw `Error` | returns `null` |
| `getSRGBLuminanceFromHex` | threw `Error` | returns `null` |
| `getContrastRatioFromHex` | threw `Error` | returns `null` |
| `isHexDarkColour` | threw `Error` | returns `false` |
| `pickHexColourContrast` | threw `Error` | returns `null` |

### Why

Throwing on invalid colour strings forces consumers to wrap every call in `try/catch` even in non-exceptional situations (e.g. validating user input). Returning a nullable value lets callers use idiomatic null checks and opt out of error handling entirely when the input is already trusted.

### How to update your code

**Functions that now return `null`** — add a null guard before using the result:

```ts
// before
const rgb = convertHextoRGB(hex); // threw on bad input

// after
const rgb = convertHextoRGB(hex);
if (!rgb) {
  // handle invalid input
}
```

**`isHexDarkColour`** — now returns `false` for invalid input instead of throwing. If you were catching errors to detect invalid hex strings, use `isHexColour` to validate first:

```ts
// before
try {
  const dark = isHexDarkColour(colour, "WCAG2.1");
} catch {
  // invalid colour
}

// after
if (!isHexColour(colour)) {
  // invalid colour
} else {
  const dark = isHexDarkColour(colour, "WCAG2.1");
}
```
