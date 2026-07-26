<img alt="Sardine logo" src="https://colour.sardine.dev/assets/icons/logo.svg" width="300">

# @sardine/colour

Dependency-free TypeScript utilities for working with colours in JavaScript. Convert between common colour formats, calculate contrast and luminance, find the closest colour in a palette, and pick readable foreground colours without pulling in a larger colour toolkit.

- **Common formats.** Work with hex strings, RGB objects, CSS `rgb()`/`rgba()` strings, named CSS colours, XYZ, and Lab.
- **Accessibility helpers.** Calculate WCAG contrast ratios, get sRGB luminance, and choose the higher-contrast hex colour for a background.
- **Palette matching.** Find the nearest colour from hex, CSS RGB, named CSS, RGB object, or mixed-format palettes.
- **Ready to bundle.** Ships ESM, CommonJS, TypeScript declarations, and an unpkg build with no runtime dependencies.

```ts
import { convertHextoRGB, getContrastRatio } from "@sardine/colour";

convertHextoRGB("#bed"); //=> { R: 187, G: 238, B: 221 }
getContrastRatio("red", "#00FF00", "WCAG2.1"); //=> 2.913
```

## Requirements

- [Node.js](https://nodejs.org/en/download/) 20 and up

## Installation

```bash
npm install @sardine/colour
```

Then import the utilities you need:

```ts
import { convertRGBtoHex, pickHexColourContrast } from "@sardine/colour";

convertRGBtoHex({ R: 255, G: 204, B: 0 });

pickHexColourContrast(
	{
		backgroundColour: "#DD337F",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	},
	"WCAG2.1",
);
```

## Documentation

Read the full API documentation at <https://colour.sardine.dev/>.
