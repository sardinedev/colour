import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { findNearestEntry } from "./util/findNearestEntry";

/**
 * Finds the CSS RGB colour in a palette that is nearest to the given CSS RGB colour, using CIEDE2000.
 *
 * - Returns the palette entry exactly as given (`"rgb(250, 0, 0)"` keeps its commas and spacing).
 * - Entries that are not valid CSS RGB colours are skipped.
 * - Alpha is ignored. When several entries are equally near, the first one wins.
 *
 * @param {string} colour - The CSS RGB colour to find the nearest match for, e.g. `rgb(255 0 0)`.
 * @param {readonly string[]} palette - The CSS RGB colours to search. It is not modified.
 * @returns {string | null} The nearest palette entry, or `null` if the colour is invalid or the palette is missing or has no valid entry.
 */
export function findNearestCSSRGBColour<T extends string>(
	colour: string,
	palette: readonly T[],
): T | null {
	const target = convertCSSRGBtoRGB(colour);
	if (target === null) return null;
	return findNearestEntry(target, palette, convertCSSRGBtoRGB);
}
