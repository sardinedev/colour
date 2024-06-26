import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";
import type { RGBColour } from "./types";

/**
 * Converts CSS RGB colour format into Hexadecimal.
 * @param {string} colour - A CSS RGB colour in the format:
 *
 * - `rgb(0,0,0)`
 * - `rgba(0,0,0,0.4)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 *
 * @returns {string} - An hexadecimal string
 */
export function convertCSSRGBtoHex(colour: string): string {
	const rgb: RGBColour = convertCSSRGBtoRGB(colour);
	return convertRGBtoHex(rgb);
}
