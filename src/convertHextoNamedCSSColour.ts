import { namedCSSColours } from "./util/namedCSSColours.js";
import type { NamedCSSColour } from "./types.js";

/**
 * Converts a hexadecimal colour value to a named CSS colour.
 *
 * @param {string} colour - The hexadecimal colour value to convert.
 * @returns {NamedCSSColour | undefined} The named CSS colour that corresponds to the given hexadecimal colour value, or undefined if no named CSS colour matches the given value.
 */
export function convertHextoNamedCSSColour(
	colour: string,
): NamedCSSColour | undefined {
	for (const [name, hex] of namedCSSColours.entries()) {
		if (hex === colour) {
			return name as NamedCSSColour;
		}
	}
	return undefined;
}
