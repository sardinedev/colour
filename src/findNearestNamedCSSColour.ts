import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB.js";
import { convertRGBtoNamedCSSColour } from "./convertRGBtoNamedCSSColour.js";
import { findNearestRGBColour } from "./findNearestRGBColour.js";
import type { NamedCSSColour, RGBColour } from "./types.js";

export function findNearestNamedCSSColour(
	colour: NamedCSSColour,
	palette: NamedCSSColour[],
): NamedCSSColour {
	if (!palette || palette.length < 2) {
		return colour;
	}
	const baseRGBColour = convertNamedCSSColourtoRGB(colour);
	const paletteRGBColours = palette.map((hexColour) =>
		convertNamedCSSColourtoRGB(hexColour),
	);

	const filteredPaletteRGBColours: RGBColour[] = paletteRGBColours.filter(
		(paletteRGBColour) => paletteRGBColour !== undefined,
	) as RGBColour[];

	if (!baseRGBColour || filteredPaletteRGBColours.length < 2) {
		return colour;
	}

	const nearestRGBColour = findNearestRGBColour(
		baseRGBColour,
		filteredPaletteRGBColours,
	);
	return convertRGBtoNamedCSSColour(nearestRGBColour) as NamedCSSColour;
}
