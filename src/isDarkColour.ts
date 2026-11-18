import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { parseColour } from "./parseColour";
import type { NamedCSSColour } from "./types";
import { isDarkLuminance } from "./util/index";

/**
 * Evaluates if a colour is dark by measuring the contrast ratio against black and white.
 * It accepts CSS RGB colours (including percentage values), named CSS or hexadecimal.
 *
 * If you know in advance the type of colour you want to evaluate consider using `isCSSNamedDarkColour`, `isCSSRGBDarkColour` or `isHexDarkColour` as they are smaller functions.
 *
 * Invalid colours return `false`. Use `parseColour` first if you need to tell an invalid colour apart from a light one.
 * @param {string | NamedCSSColour} colour - A colour value, ie: `hotpink`, `#333222`, `rgb(12,34,45)`, or `rgb(50%, 25%, 100%)`
 * @returns {boolean} `true` if the colour is dark, `false` if it is light or not a valid colour
 */
export function isDarkColour(colour: string | NamedCSSColour): boolean {
	// parseColour also accepts RGB objects; this API is string-only
	if (typeof colour !== "string") return false;
	const rgb = parseColour(colour);
	if (!rgb) return false;
	return isDarkLuminance(getSRGBLuminanceFromRGB(rgb));
}
