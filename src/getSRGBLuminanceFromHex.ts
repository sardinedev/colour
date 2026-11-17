import { convertHextoRGB } from "./convertHextoRGB";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";

/**
 * Returns the relative luminance of a colour in the sRGB space.
 *
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 *
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 * @param colour an hexadecimal colour
 */
export function getSRGBLuminanceFromHex(colour: string) {
	const rgbColor = convertHextoRGB(colour);
	if (!rgbColor) return null;
	return getSRGBLuminanceFromRGB(rgbColor);
}
