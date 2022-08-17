---
title: Convert RGB to XYZ
code: true
tags:
  - docs
  - converters
---

## Description

This function converts RGB colours into a Lab object.

It accepts an RGB object and converts it to XYZ first and then from XYZ to Lab

## Signature

```typescript
function convertRGBtoXYZ(colour: RGBColour): XYZColour;
```

## Example

```javascript
import { convertRGBtoXYZ } from "@sardine/colour";

const xyzColour = convertRGBtoXYZ({ R: 34, G: 250, B: 124 });
console.log(xyzColour);
/* expects 
{
    X: 38.483384631576946,
    Y: 70.16653157373521,
    Z: 30.583997140084364,
}
*/
```
