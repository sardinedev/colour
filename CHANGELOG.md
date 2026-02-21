# @sardine/colour

## 3.0.0

### Major Changes

- 79fb625: Sets Node 20 as minimum supported version

### Minor Changes

- 035dc7e: Add sortHexColours function for colour sorting

  This release introduces the new `sortHexColours()` function that provides intelligent sorting of hex colour arrays with support for multiple colour types and custom ordering logic.

  ### New Features

  - **Hue-based sorting**: Primary sort by hue (0° to 360°), then by saturation (descending)
  - **Greyscale handling**: Colours with 0% saturation are moved to the end with custom ordering
  - **Transparent support**: Fully transparent colours (alpha = 0) are placed at the very end
  - **Multi-format support**: Accepts both 6-digit (`#RRGGBB`) and 8-digit (`#RRGGBBAA`) hex formats

  ### Sorting Behavior

  1. **Normal colours**: Sorted by hue first, then by descending saturation
  2. **Greyscale colours**: Custom ordering - grey shades first, then black, then white
  3. **Transparent colours**: Sorted by brightness value (darkest to lightest)

  ### Usage Example

  ```typescript
  import { sortHexColours } from "@sardine/colour";

  const colors = [
    "#ff0000", // red
    "#00ff00", // green
    "#808080", // gray
    "#000000", // black
    "#ffffff", // white
    "#00000000", // transparent black
  ];

  const sorted = sortHexColours(colors);
  // Result: ['#ff0000', '#00ff00', '#808080', '#000000', '#ffffff', '#00000000']
  ```

  ### Supported Hex Formats

  - `#RGB` - 3-digit hex (expanded to 6-digit)
  - `#RRGGBB` - 6-digit hex colors
  - `#RGBA` - 4-digit hex with alpha (expanded to 8-digit)
  - `#RRGGBBAA` - 8-digit hex with alpha channel

- e13143e: Add comprehensive support for CSS RGB percentage values

  This release adds full CSS RGB percentage support across all functions that accept CSS RGB input:

  ### New Features

  - **RGB percentage values**: `rgb(50%, 25%, 100%)` - percentages (0%-100%) map to RGB values (0-255)
  - **Alpha percentage values**: `rgba(50%, 25%, 100%, 80%)` - alpha percentages (0%-100%) map to alpha values (0-1)
  - **Mixed formats**: `rgba(128, 25%, 255, 50%)` - mix integer and percentage values in the same color
  - **Modern CSS syntax**: Full support for space-separated values and slash separators (`rgb(50% 25% 100% / 80%)`)
  - **Decimal percentages**: Support for decimal percentages like `rgb(50.5%, 25.25%, 99.9%)`

  ### Enhanced Functions

  - `convertCSSRGBtoRGB()` - Core percentage parsing logic
  - `convertCSSRGBtoHex()` - Now supports percentage input values
  - `isCSSRGBDarkColour()` - Works with percentage-based colors
  - `getContrastRatioFromCSSRGB()` - Calculates contrast with percentage colors
  - `findNearestCSSRGBColour()` - Finds nearest colors using percentage inputs
  - `isCSSRGBColour()` - Validates percentage-based CSS RGB strings
  - `isDarkColour()` - Enhanced to work with CSS RGB percentages
  - `getContrastRatio()` - Benefits from percentage support via underlying functions

  ### Supported CSS RGB Formats

  All functions now support the complete CSS RGB specification:

  - `rgb(255, 128, 0)` - Integer values with commas
  - `rgb(255 128 0)` - Integer values with spaces
  - `rgb(100%, 50%, 0%)` - Percentage values
  - `rgba(100%, 50%, 0%, 0.8)` - RGB percentages with decimal alpha
  - `rgba(100%, 50%, 0%, 80%)` - RGB percentages with percentage alpha
  - `rgb(255 50% 0 / 0.8)` - Mixed integer/percentage with slash syntax
  - All variations with `rgba()` function and alpha channels

## 2.4.0

### Minor Changes

- 94632b1: Adds `isHexColour` and `isNamedCSSColour`

## 2.3.0

### Minor Changes

- c637706: Adds convertHextoCSSRGB

### Patch Changes

- c637706: convertHextoRGB now returns alpha channel values rounded to two decimal points

## 2.2.1

### Patch Changes

- 4c803cc: Optimise bundle size by refactoring repeated code. Saved 0.02 kB

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
