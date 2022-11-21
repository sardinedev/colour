---
title: Convert XYZ to Lab
code: true
tags:
  - docs
  - converters
---

## Description

This function converts colours in the CIELAB colourspace into a Lab object.

## Signature

```typescript
function convertXYZtoLab(colour: XYZColour): LabColour;
```

## Example

```javascript
import { convertXYZtoLab } from "@sardine/colour";
const XYZ = {
  X: 20.517540535826125,
  Y: 21.586050011389926,
  Z: 23.50720846240363,
};
const labColour = convertXYZtoLab(XYZ);
console.log(labColour);
/* expects 
{
    L: 53.58501345216902,
    a: 0.003155620347972121,
    b: -0.006243566036268078,
}
*/
```
