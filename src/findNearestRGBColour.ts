import { RGBdistance } from "./RGBdistance";
import type { RGBColour } from "./types";

/**
 * Finds the nearest RGB colour in a palette to the given RGB colour.
 *
 * @param {RGBColour} colour - The RGB colour to find the nearest match for.
 * @param {RGBColour[]} palette - An array of RGB colours to search for the nearest match in.
 * @returns {RGBColour} The RGB colour in the palette that is closest to the given colour.
 * If the palette has fewer than 2 colours, or if it is undefined or null, the original colour is returned.
 */
export function findNearestRGBColour(
	colour: RGBColour,
	palette: RGBColour[],
): RGBColour {
	if (!palette || palette.length < 2) {
		return colour;
	}
	const map: [RGBColour, number][] = [];
	for (const paletteColour of palette) {
		const distance = RGBdistance(colour, paletteColour);
		map.push([paletteColour, distance]);
	}
	const closest: [RGBColour, number][] = map.sort((a, b) => a[1] - b[1]);
	// @ts-ignore - TS insists that the return type is [RGBColour, number] | undefined even though it's not
	return closest[0][0];
}
