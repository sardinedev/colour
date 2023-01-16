---
title: Convert a named CSS colours to Hexadecimal
code: true
tags:
  - converters
---

## Description

Converts a named CSS Colour in an hexadecimal one.

List of colours sourced here:
https://developer.mozilla.org/en-US/docs/Web/CSS/named-color

Returns `undefined` if the colour is not found.

## Signature

```typescript
function convertNamedCSSColourtoHex(name: string): string;
```

## Example

```javascript
import { convertNamedCSSColourtoHex } from "@sardine/colour";

const hexColour = convertNamedCSSColourtoHex("papayawhip");
console.log(hexColour);
// expects #FFEFD5
```
