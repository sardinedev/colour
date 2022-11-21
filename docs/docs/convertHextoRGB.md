---
title: Convert Hexadecimal to RGB
code: true
tags:
  - docs
  - converters
---

## Description

This function converts hexadecimal colours into a RGB object.
It accepts multiple formats of hexadecimal colours:

- 6 digit hexadecimal, ie `#FF11AA`
- 3 digit hexadecimal, ie `#AAA`
- 8 digit hexadecimal, ie `#FF11AAFF`
- 4 digit hexadecimal, ie `#FFFF`

It will throw an error if a string is not passed or it is in a different format that the one described above.

## Signature

```typescript
function convertHextoRGB(hex: string): RGBColour;
```

## Example

```javascript
import { convertHextoRGB } from "@sardine/colour";

const rgbColour = convertHextoRGB("#FFFFFF");
console.log(rgbColour);
// expects { R: 255, G: 255, B: 255 }
```
