import type { NamedCSSColour } from "./types";
import { namedCSSColours } from "./util/namedCSSColours";

/**
 * Converts a hexadecimal colour value to a named CSS colour.
 *
 * Matching is exact against the lowercase 6 or 8 digit values in the named colour list
 * (`#00ffff` matches, `#0FF` does not). When several names share a value, the first
 * one in the list wins (`#00ffff` is `aqua`, not `cyan`).
 *
 * @param {string} colour - The hexadecimal colour value to convert.
 * @returns {NamedCSSColour | null} The named CSS colour that corresponds to the given hexadecimal colour value, or `null` if no named CSS colour matches the given value.
 */
export function convertHextoNamedCSSColour(
	colour: string,
): NamedCSSColour | null {
	for (const [name, hex] of namedCSSColours.entries()) {
		if (hex === colour) {
			return name;
		}
	}
	return null;
}
