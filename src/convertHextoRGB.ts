import type { RGBColour } from "./types";
import { hexAnyRegex } from "./util/regexers";

/**
 * Converts an hexadecimal colour into RGB colour object.
 * @param {string} hex - An hexadecimal colour in the format:
 *
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 *
 * @returns {RGBColour | null} RGB colour object, or `null` if the input is not a valid hexadecimal colour.
 */
export function convertHextoRGB(hex: string): RGBColour | null {
	if (typeof hex !== "string" || !hexAnyRegex.test(hex)) {
		return null;
	}

	switch (hex.length) {
		case 7: // #RRGGBB
			return {
				R: parseInt(hex.slice(1, 3), 16),
				G: parseInt(hex.slice(3, 5), 16),
				B: parseInt(hex.slice(5, 7), 16),
			};
		case 4: // #RGB
			return {
				R: parseInt(hex.slice(1, 2).repeat(2), 16),
				G: parseInt(hex.slice(2, 3).repeat(2), 16),
				B: parseInt(hex.slice(3, 4).repeat(2), 16),
			};
		case 9: // #RRGGBBAA
			return {
				R: parseInt(hex.slice(1, 3), 16),
				G: parseInt(hex.slice(3, 5), 16),
				B: parseInt(hex.slice(5, 7), 16),
				A: Math.round((parseInt(hex.slice(7, 9), 16) / 255) * 100) / 100,
			};
		default: // #RGBA (length 5)
			return {
				R: parseInt(hex.slice(1, 2).repeat(2), 16),
				G: parseInt(hex.slice(2, 3).repeat(2), 16),
				B: parseInt(hex.slice(3, 4).repeat(2), 16),
				A:
					Math.round((parseInt(hex.slice(4, 5).repeat(2), 16) / 255) * 100) /
					100,
			};
	}
}
