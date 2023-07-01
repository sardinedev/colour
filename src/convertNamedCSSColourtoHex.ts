import { namedCSSColours } from "./util/namedCSSColours.js";
import type { NamedCSSColour } from "./types.js";

/**
 * Converts a named CSS Colour in an hexadecimal one.
 *
 * List of colours sourced here:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param {NamedCSSColour} name - A named CSS colour
 * @returns {string} - An hexadecimal string
 */
export function convertNamedCSSColourtoHex(
	name: NamedCSSColour,
): string | undefined {
	return namedCSSColours.get(name);
}
