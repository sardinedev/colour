import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import { isDarkLuminance } from "./util/index";

/**
 * Evaluates if a colour is dark by measuring the contrast ratio against black and white
 * @param {string} colour - A colour in the hexadecimal format
 * @returns {boolean} `true` if the colour is dark, `false` if it is light or not a valid hexadecimal colour
 */
export function isHexDarkColour(colour: string): boolean {
	const luminance = getSRGBLuminanceFromHex(colour);
	if (luminance === null) return false;
	return isDarkLuminance(luminance);
}
