import { convertHextoRGB } from "./convertHextoRGB";

/**
 * Converts an hexadecimal colour into CSS RGB/A colour.
 * @param {string} hex - An hexadecimal colour in the format:
 *
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 *
 * @returns {string} `Either a CSS RGB or CSS RGBA string`.
 */
export function convertHextoCSSRGB(hex: string): string {
	const rgb = convertHextoRGB(hex);

	if (rgb.A) {
		return `rgba(${rgb.R},${rgb.G},${rgb.B},${rgb.A})`;
	}
	return `rgb(${rgb.R},${rgb.G},${rgb.B})`;
}
