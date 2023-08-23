import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB.js";
import { convertRGBtoCSSRGB } from "./convertRGBtoCSSRGB.js";
import { findNearestRGBColour } from "./findNearestRGBColour.js";

/**
 * Finds the nearest CSS RGB colour in a palette to a given CSS RGB colour.
 *
 * @param {string} colour - The CSS RGB colour to find the nearest match for. Alpha channel is ignored.
 * @param {string[]} palette - An array of CSS RGB colours to search for the nearest match.
 * @returns {string} The CSS RGB colour in the palette that is closest to the given colour.
 * If the palette has fewer than 2 colours, or if it is undefined or null, the original colour is returned.
 * The CSS RGB colour string is in the format `rgb(R G B)`.
 */
export function findNearestCSSRGBColour(
	colour: string,
	palette: string[],
): string {
	if (!palette || palette.length < 2) {
		return colour;
	}
	const baseRGBColour = convertCSSRGBtoRGB(colour);
	const paletteRGBColours = palette.map((hexColour) =>
		convertCSSRGBtoRGB(hexColour),
	);
	const nearestRGBColour = findNearestRGBColour(
		baseRGBColour,
		paletteRGBColours,
	);
	return convertRGBtoCSSRGB(nearestRGBColour);
}
