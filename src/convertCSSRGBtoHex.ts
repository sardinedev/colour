import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";

/**
 * Converts CSS RGB colour format into Hexadecimal.
 * @param {string} colour - A CSS RGB colour in the format:
 *
 * - `rgb(0,0,0)`
 * - `rgba(0,0,0,0.4)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * - `rgb(50%, 25%, 100%)`
 * - `rgba(50%, 25%, 100%, 0.8)`
 * - `rgba(50%, 25%, 100%, 80%)`
 *
 * @returns {string | null} - An hexadecimal string, or `null` if the input is not a valid CSS RGB colour.
 */
export function convertCSSRGBtoHex(colour: string): string | null {
	const rgb = convertCSSRGBtoRGB(colour);
	if (!rgb) return null;
	return convertRGBtoHex(rgb);
}
