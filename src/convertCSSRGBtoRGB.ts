import { cssRGBARegex } from "./util/regexers";

import type { RGBColour } from "./types";

const PERCENT = 37; // "%"

/**
 * Converts a CSS RGB/Alpha value to its numeric equivalent, without clamping.
 * @param value - The value string (e.g., "50%", "127", "0.5")
 * @param isAlpha - Whether this is an alpha channel value
 * @returns The numeric value
 */
export function convertCssValueToNumber(
	value: string,
	isAlpha = false,
): number {
	// parseFloat stops at the "%", so the sign and digits parse without slicing
	const number = Number.parseFloat(value);
	if (value.charCodeAt(value.length - 1) !== PERCENT) return number;
	// Alpha percentages: 0%-100% maps to 0-1
	if (isAlpha) return number / 100;
	// RGB percentages: 0%-100% maps to 0-255, keeping fractions.
	// Multiply first so exact inputs stay exact (2% gives 5.1, not 5.1000000000000005)
	return (number * 255) / 100;
}

/** Parses a CSS RGB channel value and clamps it to 0–255. */
export function parseCssRgbChannel(value: string): number {
	const channel = convertCssValueToNumber(value);
	// biome-ignore lint/complexity/useMathMinMax: comparisons are faster on this hot path (runs three times per parse)
	return channel < 0 ? 0 : channel > 255 ? 255 : channel;
}

/** Parses a CSS alpha value and clamps it to 0–1. */
export function parseCssAlphaChannel(value: string): number {
	const alpha = convertCssValueToNumber(value, true);
	// biome-ignore lint/complexity/useMathMinMax: matches parseCssRgbChannel's clamp on the parse hot path
	return alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
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
	const match = cssRGBARegex.exec(colour);
	if (match === null) return null;

	// The regex guarantees groups 1-3 are present; group 4 (alpha) is optional
	const R = parseCssRgbChannel(match[1] as string);
	const G = parseCssRgbChannel(match[2] as string);
	const B = parseCssRgbChannel(match[3] as string);
	const alpha = match[4];
	// One literal per shape instead of adding A to an existing object
	if (alpha === undefined) return { R, G, B };
	return { R, G, B, A: parseCssAlphaChannel(alpha) };
}
