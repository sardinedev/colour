import { convertHextoRGB } from "./convertHextoRGB.js";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB.js";
import type { WCAG } from "./types";

/**
 * Returns the relative luminance of a colour in the sRGB space.
 *
 * The calculations are compatible with WCAG 3.0 as it aligns with the sRGB spec
 * and difference to WCAG 2.1 is minimal in a 8 bit channel.
 *
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 *
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 * @param colour an hexadecimal colour
 */
export function getSRGBLuminanceFromHex(colour: string, standard?: WCAG) {
	const rgbColor = convertHextoRGB(colour);
	return getSRGBLuminanceFromRGB(rgbColor, standard);
}
