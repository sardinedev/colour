import { convertHextoRGB } from "./convertHextoRGB";
import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import type { NamedCSSColour, RGBColour } from "./types";

/**
 * Converts a named CSS colour to an RGB colour object.
 *
 * @param {NamedCSSColour} colour - The named CSS colour to convert.
 * @returns {RGBColour | undefined} An RGB colour object representing the named CSS colour, or undefined if the named CSS colour is not recognized.
 */
export function convertNamedCSSColourtoRGB(
	colour: NamedCSSColour,
): RGBColour | undefined {
	const hex = convertNamedCSSColourtoHex(colour);
	if (!hex) {
		return undefined;
	}
	return convertHextoRGB(hex);
}
