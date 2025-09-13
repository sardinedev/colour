---
"@sardine/colour": minor
---

Add comprehensive support for CSS RGB percentage values

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
