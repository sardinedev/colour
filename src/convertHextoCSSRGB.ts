import { convertHextoRGB } from "./convertHextoRGB";
import { serializeAlphaByte } from "./util/index";

/**
 * Converts an hexadecimal colour into CSS RGB/A colour.
 * @param {string} hex - An hexadecimal colour in the format:
 *
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 *
 * Alpha is written with the fewest decimals (2 or 3) that map back to the same
 * byte, as browsers serialize it: `#00000080` becomes `rgba(0,0,0,0.5)`.
 *
 * @returns {string | null} either a CSS RGB or CSS RGBA string, or `null` if the input is not a valid hexadecimal colour.
 */
export function convertHextoCSSRGB(hex: string): string | null {
	const rgb = convertHextoRGB(hex);
	if (!rgb) return null;

	if (rgb.A !== undefined) {
		return `rgba(${rgb.R},${rgb.G},${rgb.B},${serializeAlphaByte(rgb.A)})`;
	}
	return `rgb(${rgb.R},${rgb.G},${rgb.B})`;
}
