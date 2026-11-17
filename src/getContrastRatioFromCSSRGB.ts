import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

/**
 * Calculates the contrast ratio between two colours in CSSRGB format.
 * @param colour1 The first colour in CSSRGB format
 * @param colour2 The second colour in CSSRGB format
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function getContrastRatioFromCSSRGB(
	colour1: string,
	colour2: string,
): number {
	const rgbColour1 = convertCSSRGBtoRGB(colour1);
	const rgbColour2 = convertCSSRGBtoRGB(colour2);
	// Get the luminance of each colour
	const luminance1 = getSRGBLuminanceFromRGB(rgbColour1);
	const luminance2 = getSRGBLuminanceFromRGB(rgbColour2);

	return calculateContrastRatio(luminance1, luminance2);
}
