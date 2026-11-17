import type { RGBColour } from "./types";
import { linearRGB } from "./util/index";

/**
 * Returns the relative luminance of a colour in the sRGB space.
 *
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 *
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 * @param colour RGB channel values
 */
export function getSRGBLuminanceFromRGB({ R, G, B }: RGBColour) {
	const r = linearRGB(R);
	const g = linearRGB(G);
	const b = linearRGB(B);

	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
