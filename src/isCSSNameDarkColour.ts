import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import { isHexDarkColour } from "./isHexDarkColour";
import type { NamedCSSColour } from "./types";
import { NAMED_CSS_COLOUR_URL } from "./util/index";

/**
 * Evaluates if a named CSS colour is dark by measuring the contrast ratio against black and white
 * @param {string} name - A named CSS colour, ie: `hotpink`
 * @returns { boolean } Returns `true`, `false` or `undefined` if name is not a valid CSS named colour
 */
export function isCSSNamedDarkColour(name: NamedCSSColour): boolean {
	const hex = convertNamedCSSColourtoHex(name);
	if (hex) {
		return isHexDarkColour(hex);
	}
	throw new Error(
		`${name} is not a valid colour format. isCSSNamedDarkColour only accepts CSS named colours. See ${NAMED_CSS_COLOUR_URL}`,
	);
}
