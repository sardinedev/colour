import { convertHextoRGB } from "./convertHextoRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";
import { findNearestRGBColour } from "./findNearestRGBColour";

/**
 * Finds the nearest hexadecimal colour in a palette to the given hex colour.
 *
 * @param {string} colour - The hexadecimal colour to find the nearest match for.
 * @param {string[]} palette - An array of hexadecimal colours to search for the nearest match in.
 * @returns {string} The hexadecimal colour in the palette that is closest to the given colour.
 * If the palette has fewer than 2 colours, or if it is undefined or null, the original colour is returned.
 */
export function findNearestHexColour(
	colour: string,
	palette: string[],
): string {
	if (!palette || palette.length < 2) {
		return colour;
	}
	const baseRGBColour = convertHextoRGB(colour);
	const paletteRGBColours = palette.map((hexColour) =>
		convertHextoRGB(hexColour),
	);
	const nearestRGBColour = findNearestRGBColour(
		baseRGBColour,
		paletteRGBColours,
	);
	return convertRGBtoHex(nearestRGBColour);
}
