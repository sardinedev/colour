import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import { isHexDarkColour } from "./isHexDarkColour";

import type { NamedCSSColour } from "./types";

/**
 * Evaluates if a named CSS colour is dark by measuring the contrast ratio against black and white
 * @param {NamedCSSColour} name - A named CSS colour, ie: `hotpink`
 * @returns {boolean} `true` if the colour is dark, `false` if it is light or not a named CSS colour
 */
export function isCSSNamedDarkColour(name: NamedCSSColour): boolean {
	const hex = convertNamedCSSColourtoHex(name);
	if (!hex) return false;
	return isHexDarkColour(hex);
}
