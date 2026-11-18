import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

/**
 * Calculates the contrast ratio between two colours in hexadecimal format.
 * @param colour1 The first colour in hexadecimal format
 * @param colour2 The second colour in hexadecimal format
 * @returns The unrounded contrast ratio between the two colours, or `null` if either colour is invalid
 */
export function getContrastRatioFromHex(
	colour1: string,
	colour2: string,
): number | null {
	// Get the luminance of each colour
	const luminance1 = getSRGBLuminanceFromHex(colour1);
	const luminance2 = getSRGBLuminanceFromHex(colour2);
	if (luminance1 === null || luminance2 === null) return null;

	return calculateContrastRatio(luminance1, luminance2);
}
