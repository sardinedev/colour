import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "./assertions";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";
import { convertRGBtoCSSRGB } from "./convertRGBtoCSSRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";
import { convertRGBtoNamedCSSColour } from "./convertRGBtoNamedCSSColour";
import { findNearestRGBColour } from "./findNearestRGBColour";
import type { NamedCSSColour, RGBColour } from "./types";

/**
 * Finds the nearest colour in a palette to a given colour.
 *
 * @param {string | NamedCSSColour} colour - The colour to match. It can be a hexadecimal colour, a CSS RGB colour, or a named CSS colour.
 * @param {string[] | NamedCSSColour[]} palette - The palette of colours to search.
 * @returns {string} The nearest colour in the palette to the given colour.
 */
export function findNearestColour(
	colour: string | NamedCSSColour,
	palette: string[] | NamedCSSColour[],
): string | NamedCSSColour | undefined {
	if (!palette || palette.length < 2) {
		return colour;
	}

	let baseColour: RGBColour | undefined;
	let colourType: "hex" | "cssRGB" | "namedCSS" | undefined;

	const paletteRGB: RGBColour[] = [];

	if (isHexColour(colour)) {
		baseColour = convertHextoRGB(colour);
		colourType = "hex";
	} else if (isCSSRGBColour(colour)) {
		baseColour = convertCSSRGBtoRGB(colour);
		colourType = "cssRGB";
	} else if (isNamedCSSColour(colour as NamedCSSColour)) {
		baseColour = convertNamedCSSColourtoRGB(colour as NamedCSSColour);
		colourType = "namedCSS";
	}

	if (!baseColour) {
		return undefined;
	}

	for (const paletteColour of palette) {
		if (isHexColour(paletteColour)) {
			paletteRGB.push(convertHextoRGB(paletteColour));
		} else if (isCSSRGBColour(paletteColour)) {
			paletteRGB.push(convertCSSRGBtoRGB(paletteColour));
		} else if (isNamedCSSColour(paletteColour as NamedCSSColour)) {
			const rgb = convertNamedCSSColourtoRGB(paletteColour as NamedCSSColour);
			if (rgb) paletteRGB.push(rgb);
		}
	}
	if (paletteRGB.length < 2) {
		return colour;
	}

	const nearest = findNearestRGBColour(baseColour, paletteRGB);

	if (colourType === "hex") {
		return convertRGBtoHex(nearest);
	}
	if (colourType === "cssRGB") {
		return convertRGBtoCSSRGB(nearest);
	}
	// At this point the colourType should be namedCSS
	return convertRGBtoNamedCSSColour(nearest) as NamedCSSColour;
}
