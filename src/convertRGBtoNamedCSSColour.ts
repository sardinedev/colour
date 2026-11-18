import { convertHextoNamedCSSColour } from "./convertHextoNamedCSSColour";
import { convertRGBtoHex } from "./convertRGBtoHex";
import type { NamedCSSColour, RGBColour } from "./types";

/**
 * Converts an RGB colour object to a named CSS colour.
 *
 * @param {RGBColour} colour - The RGB colour object to convert.
 * @returns {NamedCSSColour | null} The named CSS colour that corresponds to the given RGB colour, or `null` if no named CSS colour matches the given colour.
 */
export function convertRGBtoNamedCSSColour(
	colour: RGBColour,
): NamedCSSColour | null {
	const hex = convertRGBtoHex(colour);
	return convertHextoNamedCSSColour(hex);
}
