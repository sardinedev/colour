import { parseColour } from "./parseColour";
import type { RGBColour } from "./types";
import { findNearestEntry } from "./util/findNearestEntry";

function parseColourString(colour: unknown): RGBColour | null {
	return typeof colour === "string" ? parseColour(colour) : null;
}

/**
 * Finds the colour in a palette that is nearest to a given colour, using CIEDE2000.
 * The colour and palette entries can be any mix of hexadecimal, CSS RGB and named CSS colour strings.
 *
 * - Returns the palette entry exactly as given, in its own format: a hex target can match a
 *   named entry and returns the name.
 * - Entries that are not valid colour strings are skipped.
 * - Alpha is ignored. When several entries are equally near, the first one wins.
 *
 * @param {string} colour - The colour to match, e.g. `#ff0000`, `rgb(255 0 0)` or `red`.
 * @param {readonly string[]} palette - The colours to search. It is not modified.
 * @returns {string | null} The nearest palette entry, or `null` if the colour is invalid or the palette is missing or has no valid entry.
 */
export function findNearestColour<T extends string>(
	colour: string,
	palette: readonly T[],
): T | null {
	const target = parseColourString(colour);
	if (target === null) return null;
	return findNearestEntry(target, palette, parseColourString);
}
