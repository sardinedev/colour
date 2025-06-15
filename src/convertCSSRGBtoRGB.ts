import type { RGBColour } from "./types";
import { cssRGBARegex } from "./util/regexers";

/**
 * Converts a CSS RGB/Alpha value to its numeric equivalent
 * @param value - The value string (e.g., "50%", "127", "0.5")
 * @param isAlpha - Whether this is an alpha channel value
 * @returns The numeric value
 */
export function convertCssValueToNumber(
	value: string,
	isAlpha = false,
): number {
	if (value.endsWith("%")) {
		const percentage = Number.parseFloat(value.slice(0, -1));
		if (isAlpha) {
			// Alpha percentages: 0%-100% maps to 0-1
			return percentage / 100;
		}
		// RGB percentages: 0%-100% maps to 0-255
		return Math.round((percentage / 100) * 255);
	}

	// For non-percentage values, just parse as number
	return Number.parseFloat(value);
}

export function convertCssRgbChannelValue(value?: string): number | undefined {
	if (!value) return undefined;
	return convertCssValueToNumber(value);
}

export function convertCssAlphaChannelValue(
	value?: string,
): number | undefined {
	if (!value) return undefined;
	return convertCssValueToNumber(value, true);
}

/**
 * Converts CSS RGB colour format into RGB colour object.
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
 * @returns {RGBColour} - RGB colour object.
 */
export function convertCSSRGBtoRGB(colour: string): RGBColour {
	const match = colour.match(cssRGBARegex);
	if (!match) {
		throw new Error(
			`convertCSSRGBtoRGB expects a valid CSS RGB string but got ${colour}`,
		);
	}

	return {
		R: convertCssRgbChannelValue(match[1]) as number,
		G: convertCssRgbChannelValue(match[2]) as number,
		B: convertCssRgbChannelValue(match[3]) as number,
		A: convertCssAlphaChannelValue(match[4]),
	};
}
