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
 * @returns {RGBColour} RGB colour object.
 */
export function convertHextoRGB(hex: string): RGBColour {
	if (typeof hex !== "string") {
		throw new Error(`convertHextoRGB expects a string but got a ${typeof hex}`);
	}

	if (!hexAnyRegex.test(hex)) {
		throw new Error(
			`convertHextoRGB expects an valid hexadecimal colour value but got ${hex}`,
		);
	}

	switch (hex.length) {
		case 7: // #RRGGBB
			return {
				R: Number.parseInt(`${hex[1]}${hex[2]}`, 16),
				G: Number.parseInt(`${hex[3]}${hex[4]}`, 16),
				B: Number.parseInt(`${hex[5]}${hex[6]}`, 16),
			};
		case 4: // #RGB
			return {
				R: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
				G: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
				B: Number.parseInt(`${hex[3]}${hex[3]}`, 16),
			};
		case 9: // #RRGGBBAA
			return {
				R: Number.parseInt(`${hex[1]}${hex[2]}`, 16),
				G: Number.parseInt(`${hex[3]}${hex[4]}`, 16),
				B: Number.parseInt(`${hex[5]}${hex[6]}`, 16),
				A:
					Math.round((Number.parseInt(`${hex[7]}${hex[8]}`, 16) / 255) * 100) /
					100,
			};
		default: // #RGBA (length 5)
			return {
				R: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
				G: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
				B: Number.parseInt(`${hex[3]}${hex[3]}`, 16),
				A:
					Math.round((Number.parseInt(`${hex[4]}${hex[4]}`, 16) / 255) * 100) /
					100,
			};
	}
}
