# @sardine/colour

## 1.6.1

### Patch Changes

- b45cbfc: fix: `convertCSSRGBtoRGB` now returns the alpha channel as `undefined` instead of `NaN` if no alpha is present in CSS RGB function

## 1.6.0

### Minor Changes

- 732f0ee: feat: Add convertNamedCSSColourtoHex
- 97eb272: feat: Add convertRGBtoHex
- 9dfb34f: feat: Add isDarkColour
- b35132a: feat: Add isCSSNamedDarkColour
- b35132a: feat: Add isCSSRGBColour
- b35132a: feat: Add isCSSRGBDarkColour
- b35132a: feat: Add isHexColour
- f16c7cf: feat: Add convertCSSRGBtoHex
- b35132a: feat: Increase coverage of different CSS RGB formats

## 1.5.0

### Minor Changes

- d513567: Add isHexDarkColour

## 1.4.0

### Minor Changes

- 748504c: feat: Add `pickHexColorContrast` function

## 1.3.0

### Minor Changes

- bea0ea2: feat: Add getSRGBLuminanceFromHex

## 1.2.0

### Minor Changes

- a0d675a: Export CJS modules

### Patch Changes

- 8f23abd: test: Added extra test
