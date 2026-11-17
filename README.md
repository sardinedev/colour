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
getContrastRatio("red", "#00FF00"); //=> 2.913
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
);
```

## Documentation

Read the full API documentation at <https://colour.sardine.dev/>.

## Repeated palette matching

When matching many targets against one palette, prepare it once and reuse the returned matcher:

```ts
import { preparePalette } from "@sardine/colour";

const nearest = preparePalette(["#bed", "rebeccapurple", "rgb(12 34 56)"]);

nearest("#bada55");
nearest("aliceblue");
```

Preparation skips invalid candidates and snapshots the palette order. String matches return the original token. RGB matches return frozen channel-value copies rather than the original objects; changing the input palette requires preparing it again. Invalid targets and palettes with no valid candidates return `null`. Ordinary one-shot matching does not allocate prepared state.

The following local measurements compare the prepared matcher with the optimized `findNearestRGBColour` path, using Node.js 22.23.4 on Linux x64 and the deterministic RGB fixtures in `bench/fixtures.ts`. Each timing is the median of seven warmed samples, confirmed in three runs; setup runs 25 preparations per sample, and lookup samples execute 1,000 lookups in batches of the stated size. Retained memory is the post-GC heap delta per prepared matcher, averaged over 100 matchers.

| Candidates | Preparation | Lookup only (1 / 10 / 100) | Retained memory |
| ---: | ---: | ---: | ---: |
| 2 | 0.0032 ms | 0.0022 / 0.0182 / 0.0986 ms | ~0.6 KB |
| 16 | 0.0104 ms | 0.0051 / 0.0502 / 0.5551 ms | ~2.5 KB |
| 256 | 0.0942 ms | 0.0767 / 0.8211 / 8.4762 ms | ~46 KB |
| 1,000 | 0.3229 ms | 0.3097 / 3.2008 / 32.4112 ms | ~141 KB |

| Candidates | 1 query: prepared total / one-shot | 10 queries: prepared total / one-shot | 100 queries: prepared total / one-shot |
| ---: | ---: | ---: | ---: |
| 2 | 0.0054 / 0.0019 ms | 0.0214 / 0.0143 ms | 0.1018 / 0.1382 ms |
| 16 | 0.0156 / 0.0096 ms | 0.0606 / 0.0941 ms | 0.5654 / 1.0102 ms |
| 256 | 0.1706 / 0.1455 ms | 0.9145 / 1.5558 ms | 8.5696 / 15.9108 ms |
| 1,000 | 0.6339 / 0.5880 ms | 3.5240 / 6.0573 ms | 32.7340 / 61.3061 ms |

These results show a useful crossover for repeated workloads: the 10-query total is faster from 16 candidates upward, while a 2-entry palette requires between 10 and 100 queries to repay setup. One query does not repay setup. The extra retained state is material for large palettes. Timings and heap deltas are workload- and runtime-dependent. Repeat-query benchmarks are in `bench/preparePalette.bench.ts`.

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
