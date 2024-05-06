import type { RGBColour, XYZColour } from "./types";
import { linearRGB } from "./util/index";

/**
 * Converts sRGB colour space to XYZ.
 * Math comes from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
 * @param {RGBColour} colour sRGB colour
 * @return {XYZColour} XYZ colour
 */
export function convertRGBtoXYZ(colour: RGBColour): XYZColour {
	const { R, G, B } = colour;
	const _R = linearRGB(R) * 100;
	const _G = linearRGB(G) * 100;
	const _B = linearRGB(B) * 100;

	// Magic numbers are pre-calculated sRGB D65 constants
	const X = _R * 0.4124 + _G * 0.3576 + _B * 0.1805;
	const Y = _R * 0.2126 + _G * 0.7152 + _B * 0.0722;
	const Z = _R * 0.0193 + _G * 0.1192 + _B * 0.9505;

	return { X, Y, Z };
}
