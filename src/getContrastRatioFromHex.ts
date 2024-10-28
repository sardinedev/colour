import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import type { WCAG } from "./types";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

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

	return calculateContrastRatio(luminance1, luminance2);
}
