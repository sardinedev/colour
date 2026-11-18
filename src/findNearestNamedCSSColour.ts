import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";
import type { NamedCSSColour } from "./types";
import { findNearestEntry } from "./util/findNearestEntry";

/**
 * Finds the named CSS colour in a palette that is nearest to the given named CSS colour, using CIEDE2000.
 *
 * - Returns the palette entry exactly as given, so aliases are kept (`"cyan"` stays `"cyan"`, not `"aqua"`).
 * - Entries that are not named CSS colours (matched exactly, lowercase) are skipped.
 * - When several entries are equally near, the first one wins.
 *
 * @param {NamedCSSColour} colour - The named CSS colour to find the nearest match for.
 * @param {readonly NamedCSSColour[]} palette - The named CSS colours to search. It is not modified.
 * @returns {NamedCSSColour | null} The nearest palette entry, or `null` if the colour is not a named CSS colour or the palette is missing or has no valid entry.
 */
export function findNearestNamedCSSColour<T extends NamedCSSColour>(
	colour: NamedCSSColour,
	palette: readonly T[],
): T | null {
	const target = convertNamedCSSColourtoRGB(colour);
	if (target === null) return null;
	return findNearestEntry(target, palette, convertNamedCSSColourtoRGB);
}
