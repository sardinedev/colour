import type { RGBColour } from "./types";
import { clamp } from "./util/index";
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
		// RGB percentages: 0%-100% maps to 0-255, keeping fractions
		// Multiply first so exact inputs stay exact (2% gives 5.1, not 5.1000000000000005)
		return (percentage * 255) / 100;
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
 * Channels keep fractional values (`50%` becomes `127.5`). Out-of-range values are
 * clamped like CSS computed values: RGB channels to 0–255 and alpha to 0–1.
 * An omitted alpha is left out of the result, which means opaque.
 *
 * @returns {RGBColour | null} RGB colour object, or `null` if the input is not a valid CSS RGB colour.
 */
export function convertCSSRGBtoRGB(colour: string): RGBColour | null {
	if (typeof colour !== "string") return null;
	const match = colour.match(cssRGBARegex);
	if (!match) return null;

	const rgb: RGBColour = {
		R: clamp(convertCssRgbChannelValue(match[1]) as number, 0, 255),
		G: clamp(convertCssRgbChannelValue(match[2]) as number, 0, 255),
		B: clamp(convertCssRgbChannelValue(match[3]) as number, 0, 255),
	};
	const alpha = convertCssAlphaChannelValue(match[4]);
	if (alpha !== undefined) rgb.A = clamp(alpha, 0, 1);
	return rgb;
}
