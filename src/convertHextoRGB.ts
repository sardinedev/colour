import type { RGBColour } from "./types";
import {
	hexAlphaRegex,
	hexRegex,
	shortAlphaHexRegex,
	shortHexRegex,
} from "./util/regexers";

/**
 * Converts an hexadecimal colour into RGB colour object.
 * @param {string} hex - An hexadecimal colour in the format:
 *
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 *
 * @returns {RGBColour} - RGB colour object.
 */
export function convertHextoRGB(hex: string): RGBColour {
	if (typeof hex !== "string") {
		throw new Error(`convertHextoRGB expects a string but got a ${typeof hex}`);
	}

	if (hex.match(hexRegex)) {
		return {
			R: Number.parseInt(`${hex[1]}${hex[2]}`, 16),
			G: Number.parseInt(`${hex[3]}${hex[4]}`, 16),
			B: Number.parseInt(`${hex[5]}${hex[6]}`, 16),
		};
	}

	if (hex.match(shortHexRegex)) {
		return {
			R: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
			G: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
			B: Number.parseInt(`${hex[3]}${hex[3]}`, 16),
		};
	}

	if (hex.match(hexAlphaRegex)) {
		return {
			R: Number.parseInt(`${hex[1]}${hex[2]}`, 16),
			G: Number.parseInt(`${hex[3]}${hex[4]}`, 16),
			B: Number.parseInt(`${hex[5]}${hex[6]}`, 16),
			A: Number.parseInt(`${hex[7]}${hex[8]}`, 16) / 255,
		};
	}

	if (hex.match(shortAlphaHexRegex)) {
		return {
			R: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
			G: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
			B: Number.parseInt(`${hex[3]}${hex[3]}`, 16),
			A: Number.parseInt(`${hex[4]}${hex[4]}`, 16) / 255,
		};
	}

	throw new Error(
		`convertHextoRGB expects an valid hexadecimal colour value but got ${hex}`,
	);
}
