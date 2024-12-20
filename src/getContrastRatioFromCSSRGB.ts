import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import type { WCAG } from "./types";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

/**
 * Calculates the contrast ratio between two colours in CSSRGB format.
 * @param colour1 The first colour in CSSRGB format
 * @param colour2 The second colour in CSSRGB format
 * @param standard The standard to evaluate the contrast ratio against, defaults to WCAG2.1
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function getContrastRatioFromCSSRGB(
	colour1: string,
	colour2: string,
	standard: WCAG,
): number {
	const rgbColour1 = convertCSSRGBtoRGB(colour1);
	const rgbColour2 = convertCSSRGBtoRGB(colour2);
	// Get the luminance of each colour
	const luminance1 = getSRGBLuminanceFromRGB(rgbColour1, standard);
	const luminance2 = getSRGBLuminanceFromRGB(rgbColour2, standard);

	return calculateContrastRatio(luminance1, luminance2);
}
