---
title: Convert RGB to Hexadecimal
code: true
tags:
  - docs
  - converters
---

## Description

This function converts RGB colours into hexadecimal.

It accepts an RGB object and converts it into a hexadecimal string.

## Signature

```typescript
function convertRGBtoHex(colour: RGBColour): string;
```

## Example

```javascript
import { convertRGBtoHex } from "@sardine/colour";

const hexColour = convertRGBtoHex({ R: 34, G: 250, B: 124 });
console.log(hexColour);
/* expects #22FA7C */
```
