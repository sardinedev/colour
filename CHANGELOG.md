# @sardine/colour

## 2.2.0

### Minor Changes

- a808056: Adds `getContrastRatioFromCSSRGB`
- a808056: Adds `getContrastRatioFromNamedCSSColour`
- 202ef96: Adds `getContrastRatioFromHex`
- a808056: Adds `getContrastRatio`

## 2.1.1

### Patch Changes

- 0387fa3: Export TypeScript types

## 2.1.0

### Minor Changes

- d3ed0f8: Adds a build compatible with unpkg CDN
- 2726662: Adds `convertHextoNamedCSSColour`
- 2726662: Adds `convertNamedCSSColourtoRGB`
- 2726662: Adds `convertCSSRGBtoRGB`
- 2726662: Adds `convertRGBtoCSSRGB`
- 2726662: Adds `convertRGBtoNamedCSSColour`
- 2726662: Adds `findNearestColour`
- 2726662: Adds `findNearestCSSRGBColour`
- 2726662: Adds `findNearestHexColour`
- 2726662: Adds `findNearestNamedCSSColour`
- 2726662: Adds `findNearestRGBColour`

## 2.0.2

### Patch Changes

- adfe49a: Reverts default export to CJS

  Some widely used tools like [Jest still don't support ESM](https://jestjs.io/docs/ecmascript-modules) yet.
  This reverts the package to CJS, so node based tools can use it without any issues and we rely on modern bundlers to pick the ESM version when possible.

## 2.0.1

### Patch Changes

- e4aa71e: Correctly sets package.json exports for ESM projects
- c1c02f0: Improves treeshaking for named CSS colours

## 2.0.0

### Major Changes

- f0ff977: Sets Node 16 as minimum version
- 2db684b: Adds @tsconfig/node16

### Minor Changes

- b7147f9: Adds compatibility with TypeScript's `"moduleResolution": "bundler"` compiler option

## 1.6.1

### Patch Changes

- b45cbfc: `convertCSSRGBtoRGB` now returns the alpha channel as `undefined` instead of `NaN` if no alpha is present in CSS RGB function

## 1.6.0

### Minor Changes

- 732f0ee: Add `convertNamedCSSColourtoHex`
- 97eb272: Add `convertRGBtoHex`
- 9dfb34f: Add `isDarkColour`
- b35132a: Add `isCSSNamedDarkColour`
- b35132a: Add `isCSSRGBColour`
- b35132a: Add `isCSSRGBDarkColour`
- b35132a: Add `isHexColour`
- f16c7cf: Add `convertCSSRGBtoHex`
- b35132a: Increase coverage of different CSS RGB formats

## 1.5.0

### Minor Changes

- d513567: Add `isHexDarkColour`

## 1.4.0

### Minor Changes

- 748504c: Add `pickHexColorContrast`

## 1.3.0

### Minor Changes

- bea0ea2: Add `getSRGBLuminanceFromHex`

## 1.2.0

### Minor Changes

- a0d675a: Export CJS modules

### Patch Changes

- 8f23abd: Added extra test
