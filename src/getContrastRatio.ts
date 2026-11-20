import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { parseColour } from "./parseColour";
import { calculateContrastRatio } from "./util/calculateContrastRatio";

import type { NamedCSSColour } from "./types";

/**
 * Calculates the contrast ratio between two colours.
 * Accepts CSS RGB colours (including percentage values), named CSS colours, or hexadecimal colours.
 * @param colour1 The first colour (e.g., `#ff0000`, `rgb(255,0,0)`, `rgb(100%, 0%, 0%)`, or `red`)
 * @param colour2 The second colour (e.g., `#00ff00`, `rgb(0,255,0)`, `rgb(0%, 100%, 0%)`, or `lime`)
 * @returns The unrounded contrast ratio between the two colours, or `null` if either colour is invalid
 */
export function getContrastRatio(
	colour1: string | NamedCSSColour,
	colour2: string | NamedCSSColour,
): number | null {
	// parseColour also accepts RGB objects; this API is string-only
	if (typeof colour1 !== "string" || typeof colour2 !== "string") return null;
	const rgb1 = parseColour(colour1);
	const rgb2 = parseColour(colour2);
	if (!rgb1 || !rgb2) return null;
	return calculateContrastRatio(
		getSRGBLuminanceFromRGB(rgb1),
		getSRGBLuminanceFromRGB(rgb2),
	);
}
