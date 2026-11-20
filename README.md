<img alt="Sardine logo" src="https://colour.sardine.dev/assets/icons/logo.svg" width="300">

# @sardine/colour

[![CodSpeed](https://img.shields.io/endpoint?url=https://codspeed.io/badge.json)](https://app.codspeed.io/sardinedev/colour?utm_source=badge)

Dependency-free TypeScript utilities for working with colours in JavaScript. Convert between common colour formats, calculate contrast and luminance, find the closest colour in a palette, and pick readable foreground colours without pulling in a larger colour toolkit.

- **Common formats.** Work with hex strings, RGB objects, CSS `rgb()`/`rgba()` strings, named CSS colours, XYZ, and Lab.
- **Accessibility helpers.** Calculate WCAG contrast ratios, get sRGB luminance, and choose the higher-contrast hex colour for a background.
- **Palette matching.** Find the nearest colour from hex, CSS RGB, named CSS, RGB object, or mixed-format palettes.
- **Ready to bundle.** Ships ESM, TypeScript declarations, and an unpkg build with no runtime dependencies.

```ts
import { convertHextoRGB, getContrastRatio } from "@sardine/colour";

convertHextoRGB("#bed"); //=> { R: 187, G: 238, B: 221 }
getContrastRatio("red", "#00FF00"); //=> 2.9139375476009137
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

pickHexColourContrast({
	backgroundColour: "#DD337F",
	optionOneColour: "#FFFFFF",
	optionTwoColour: "#000000",
});
```

## Matching many colours against one palette

`findNearestColour` and friends parse and convert the whole palette on every call. If you match many colours against the same palette, prepare it once:

```ts
import { preparePalette } from "@sardine/colour";

const nearestBrandColour = preparePalette([
	"#0055ff",
	"#ff3366",
	"rebeccapurple",
]);

nearestBrandColour("#1060f0"); //=> "#0055ff"
nearestBrandColour("rgb(250 40 90)"); //=> "#ff3366"
```

Preparing costs about as much as one `findNearest*` call, and every lookup after that is about 1.45–1.7× faster. Matching works like `findNearestColour`, and it also accepts RGB objects, which come back as frozen copies. Palettes can mix formats, so if you switch from a format-specific function such as `findNearestHexColour`, entries in other formats are no longer skipped. The prepared palette is a snapshot, so prepare it again after changing the palette.

## Invalid input

Functions that can fail return `null` instead of throwing, and predicates such as `isDarkColour` return `false`. To check a value before using it, or to tell an invalid colour apart from a `false` result, use `parseColour`:

```ts
import { parseColour, type RGBColour } from "@sardine/colour";

parseColour("rgb(50% 25% 100% / 0.5)"); //=> { R: 127.5, G: 63.75, B: 255, A: 0.5 }
parseColour("not-a-colour"); //=> null

const colour: RGBColour | null = parseColour(input);
```

Numbers are not rounded for display: contrast ratios, alpha and percentage channels keep full precision. Format them where you show them, for example `ratio.toFixed(2)`.

## Documentation

Read the full API documentation at <https://colour.sardine.dev/>.

## CommonJS migration

Version 5 and later are ESM-only. Use an ESM `import`:

```js
import { convertHextoRGB } from "@sardine/colour";
```

For CommonJS applications, use asynchronous `import()` where practical:

```js
const { convertHextoRGB } = await import("@sardine/colour");
```

If your application cannot use ESM or asynchronous imports, remain on version 4.x.

See the [v4 to v5 migration guide](docs/migrations/v4tov5.md) for every breaking change in version 5.
