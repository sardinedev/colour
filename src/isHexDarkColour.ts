import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import type { WCAG } from "./types";

/**
 * Evaluates if a colour is dark by measuring the contrast ratio against black and white
 * @param {string} colour - A colour in the hexadecimal format
 * @param {"WCAG2.1" | "WCAG3.0"} standard - Evaluate agains "WCAG2.1" or "WCAG3.0"
 * @returns {boolean} Returns either `true` or `false`
 */
export function isHexDarkColour(colour: string, standard: WCAG): boolean {
	const colourLuminance = getSRGBLuminanceFromHex(colour, standard) + 0.05;

	// We know white luminance is 1 so we can pre-calculate the whiteLuminance to 1.05 (1 + 0.05)
	const whiteContrast = 1.05 / colourLuminance;
	// We know black luminance is 0 so we can pre-calculate the blackLuminance to 0.05 (0 + 0.05)
	const blackContrast = colourLuminance / 0.05;

	return whiteContrast > blackContrast;
}
