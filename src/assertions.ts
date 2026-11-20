import { namedCSSColours } from "./util/namedCSSColours";
import { cssRGBARegex, hexAnyRegex } from "./util/regexers";

import type { NamedCSSColour } from "./types";

/**
 * Determines whether a string represents a valid CSS RGB or RGBA colour value.
 *
 * Captures the following CSS RGB formats:
 * - `rgb(0,0,0)`
 * - `rgba(0, 0, 0, 0.4)`
 * - `rgba(0,0,0,50%)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * - `rgb(0 0 0 / 0.5)`
 * - `rgb(0 0 0 / 50%)`
 * - `rgb(50%, 25%, 100%)`
 * - `rgba(50%, 25%, 100%, 0.8)`
 * - `rgba(50%, 25%, 100%, 80%)`
 *
 * @param {string} colour - The string to test.
 * @returns {boolean} `true` if the string represents a valid CSS RGB or RGBA colour value, `false` otherwise.
 */
export function isCSSRGBColour(colour: string): boolean {
	return cssRGBARegex.test(colour);
}

/**
 * Determines whether a string represents a valid hexadecimal colour value.
 *
 * @param {string} colour - The string to test.
 * @returns {boolean} True if the string represents a valid hexadecimal colour value, false otherwise.
 */
export function isHexColour(colour: string): boolean {
	return hexAnyRegex.test(colour);
}

/**
 * Determines whether a string represents a valid named CSS colour.
 *
 * Names are matched exactly against the lowercase CSS names, so `"Red"` is not narrowed.
 *
 * @param {string} colour - The string to test.
 * @returns {boolean} `true` if the string represents a valid named CSS colour, `false` otherwise.
 */
export function isNamedCSSColour(colour: string): colour is NamedCSSColour {
	return (namedCSSColours as ReadonlyMap<string, string>).has(colour);
}
