import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";

export function isCSSRGBDarkColour(colour: string): boolean {
	const rgb = convertCSSRGBtoRGB(colour);
	const colourLuminance = getSRGBLuminanceFromRGB(rgb);
	// We know white luminance is 1 so we can pre-calculate the whiteLuminance to 1.05 (1 + 0.05)
	const whiteContrast = 1.05 / colourLuminance;
	// We know black luminance is 0 so we can pre-calculate the blackLuminance to 0.05 (0 + 0.05)
	const blackContrast = colourLuminance / 0.05;

	return whiteContrast > blackContrast;
}
