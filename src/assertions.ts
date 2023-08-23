import { NamedCSSColour } from "./types.js";
import { namedCSSColours } from "./util/namedCSSColours.js";
import {
	cssRGBARegex,
	hexRegex,
	hexAlphaRegex,
	shortAlphaHexRegex,
	shortHexRegex,
} from "./util/regexers.js";

/**
 * Determines whether a string represents a valid CSS RGB or RGBA color value.
 *
 * Captures the folowing CSS RGB formats:
 * - `rgb(0,0,0)`
 * - `rgba(0, 0, 0, 0.4)`
 * - `rgba(0,0,0,50%)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * - `rgb(0 0 0 / 0.5)`
 * - `rgb(0 0 0 / 50%)`
 *
 * @param {string} colour - The string to test.
 * @returns {boolean} `true` if the string represents a valid CSS RGB or RGBA color value, `false` otherwise.
 */
export function isCSSRGBColour(colour: string): boolean {
	return !!colour.match(cssRGBARegex);
}

/**
 * Determines whether a string represents a valid hexadecimal colour value.
 *
 * @param {string} colour - The string to test.
 * @returns {boolean} True if the string represents a valid hexadecimal colour value, false otherwise.
 */
export function isHexColour(colour: string): boolean {
	return (
		!!colour.match(hexRegex) ||
		!!colour.match(hexAlphaRegex) ||
		!!colour.match(shortAlphaHexRegex) ||
		!!colour.match(shortHexRegex)
	);
}

/**
 * Determines whether a string represents a valid named CSS color.
 *
 * @param {NamedCSSColour} colour - The string to test.
 * @returns {boolean} `true` if the string represents a valid named CSS color, `false` otherwise.
 */
export function isNamedCSSColour(
	colour: NamedCSSColour,
): colour is NamedCSSColour {
	return namedCSSColours.has(colour);
}
