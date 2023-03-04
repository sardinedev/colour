---
title: Convert RGB to Lab
code: true
tags:
  - converters
---

## Description

This function converts RGB colours into a Lab object.

It accepts an RGB object and [converts it to XYZ](/docs/convert-rgb-to-xyz) first and then from XYZ to Lab

## Signature

```typescript
function convertRGBtoLab(colour: RGBColour): LabColour;
```

## Example

```javascript
import { convertRGBtoLab } from "@sardine/colour";

const labColour = convertRGBtoLab({ R: 34, G: 250, B: 124 });
console.log(labColour);
/* expects 
{
    L: 87.07847680208145,
    a: -74.4060883781999,
    b: 46.74058735821831,
}
*/
```
