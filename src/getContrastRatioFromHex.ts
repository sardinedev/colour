import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import type { WCAG } from "./types";

/**
 * Calculates the contrast ratio between two colours in hexadecimal format.
 * @param colour1 The first colour in hexadecimal format
 * @param colour2 The second colour in hexadecimal format
 * @param standard The standard to evaluate the contrast ratio against, defaults to WCAG2.1
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function getContrastRatioFromHex(
	colour1: string,
	colour2: string,
	standard: WCAG,
): number {
	// Get the luminance of each colour
	const luminance1 = getSRGBLuminanceFromHex(colour1, standard);
	const luminance2 = getSRGBLuminanceFromHex(colour2, standard);

	// Determine which colour is lighter and which is darker
	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);

	// Calculate the contrast ratio
	// The spec sets the ratio as (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter colour and L2 is the darker colour
	// https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
	const ratio = (lighter + 0.05) / (darker + 0.05);

	// Return the contrast ratio truncated to 3 decimal places
	return Math.floor(ratio * 1000) / 1000;
}
