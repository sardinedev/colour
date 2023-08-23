import { convertHextoNamedCSSColour } from "./convertHextoNamedCSSColour.js";
import { convertRGBtoHex } from "./convertRGBtoHex.js";
import type { NamedCSSColour, RGBColour } from "./types.js";

/**
 * Converts an RGB colour object to a named CSS colour.
 *
 * @param {RGBColour} colour - The RGB colour object to convert.
 * @returns {NamedCSSColour | undefined} The named CSS colour that corresponds to the given RGB colour, or undefined if no named CSS colour matches the given colour.
 */
export function convertRGBtoNamedCSSColour(
	colour: RGBColour,
): NamedCSSColour | undefined {
	const hex = convertRGBtoHex(colour);
	return convertHextoNamedCSSColour(hex);
}
