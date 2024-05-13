# @sardine/colour

## 2.1.0

### Minor Changes

- d3ed0f8: feat: Adds a build compatible with unpkg CDN
- 2726662: feat: Adds convertHextoNamedCSSColour
  feat: Adds convertNamedCSSColourtoRGB
  feat: Adds convertCSSRGBtoRGB
  feat: Adds convertRGBtoCSSRGB
  feat: Adds convertRGBtoNamedCSSColour
  feat: Adds findNearestColour
  feat: Adds findNearestCSSRGBColour
  feat: Adds findNearestHexColour
  feat: Adds findNearestNamedCSSColour
  feat: Adds findNearestRGBColour

## 2.0.2

### Patch Changes

- adfe49a: fix: Reverts default export to CJS

  Some widely used tools like [Jest still don't support ESM](https://jestjs.io/docs/ecmascript-modules) yet.
  This reverts the package to CJS, so node based tools can use it without any issues and we rely on modern bundlers to pick the ESM version when possible.

## 2.0.1

### Patch Changes

- e4aa71e: fix: Correctly sets package.json exports for ESM projects
- c1c02f0: bug: improves treeshaking for named CSS colours

## 2.0.0

### Major Changes

- f0ff977: chore: Sets Node 16 as minimum version
- 2db684b: chore: Adds @tsconfig/node16

### Minor Changes

- b7147f9: chore: Adds compatibility with TypeScript's `"moduleResolution": "bundler"` compiler option

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
