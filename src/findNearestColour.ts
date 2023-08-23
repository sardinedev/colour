import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "./assertions.js";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB.js";
import { convertHextoRGB } from "./convertHextoRGB.js";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB.js";
import { convertRGBtoCSSRGB } from "./convertRGBtoCSSRGB.js";
import { convertRGBtoHex } from "./convertRGBtoHex.js";
import { convertRGBtoNamedCSSColour } from "./convertRGBtoNamedCSSColour.js";
import { findNearestRGBColour } from "./findNearestRGBColour.js";
import type { NamedCSSColour, RGBColour } from "./types.js";

/**
 * Finds the nearest color in a palette to a given color.
 *
 * @param {string | NamedCSSColour} colour - The color to match. It can be a hexadecimal color, a CSS RGB color, or a named CSS color.
 * @param {string[] | NamedCSSColour[]} palette - The palette of colors to search.
 * @returns {string} The nearest color in the palette to the given color.
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
	}

	if (isCSSRGBColour(colour)) {
		baseColour = convertCSSRGBtoRGB(colour);
		colourType = "cssRGB";
	}

	// @ts-ignore - At this point colour should be a NamedCSSColour because of the assertions at the top of the function
	if (isNamedCSSColour(colour)) {
		baseColour = convertNamedCSSColourtoRGB(colour);
		colourType = "namedCSS";
	}

	if (!baseColour) {
		return undefined;
	}

	for (const paletteColour of palette) {
		if (isHexColour(paletteColour)) {
			paletteRGB.push(convertHextoRGB(paletteColour));
		}

		if (isCSSRGBColour(paletteColour)) {
			paletteRGB.push(convertCSSRGBtoRGB(paletteColour));
		}

		// @ts-ignore - At this point colour should be a NamedCSSColour because of the assertions at the top of the function
		if (isNamedCSSColour(paletteColour)) {
			// @ts-ignore - The colour is a NamedCSSColour because we just asserted that it is
			paletteRGB.push(convertNamedCSSColourtoRGB(paletteColour));
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

	if (colourType === "namedCSS") {
		return convertRGBtoNamedCSSColour(nearest) as NamedCSSColour;
	}
}
