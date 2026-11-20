import { namedCSSColours } from "./util/namedCSSColours";

import type { NamedCSSColour } from "./types";

/**
 * Converts a named CSS Colour in an hexadecimal one.
 *
 * List of colours sourced here:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param {NamedCSSColour} name - A named CSS colour
 * @returns {string | null} - An hexadecimal string, or `null` if the name is not a named CSS colour.
 */
export function convertNamedCSSColourtoHex(
	name: NamedCSSColour,
): string | null {
	return namedCSSColours.get(name) ?? null;
}
