import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

/**
 * Calculates the contrast ratio between two colours in CSSRGB format.
 * @param colour1 The first colour in CSSRGB format
 * @param colour2 The second colour in CSSRGB format
 * @returns The unrounded contrast ratio between the two colours, or `null` if either colour is invalid
 */
export function getContrastRatioFromCSSRGB(
	colour1: string,
	colour2: string,
): number | null {
	const rgbColour1 = convertCSSRGBtoRGB(colour1);
	const rgbColour2 = convertCSSRGBtoRGB(colour2);
	if (!rgbColour1 || !rgbColour2) return null;

	return calculateContrastRatio(
		getSRGBLuminanceFromRGB(rgbColour1),
		getSRGBLuminanceFromRGB(rgbColour2),
	);
}
