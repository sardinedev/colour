import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { isDarkLuminance } from "./util/index";

/**
 * Evaluates if a CSS RGB colour is dark by measuring the contrast ratio against black and white.
 * Alpha is ignored.
 * @param {string} colour - A CSS RGB colour, ie: `rgb(12, 34, 45)` or `rgb(50% 25% 100% / 0.5)`
 * @returns {boolean} `true` if the colour is dark, `false` if it is light or not a valid CSS RGB colour
 */
export function isCSSRGBDarkColour(colour: string): boolean {
	const rgb = convertCSSRGBtoRGB(colour);
	if (!rgb) return false;
	return isDarkLuminance(getSRGBLuminanceFromRGB(rgb));
}
