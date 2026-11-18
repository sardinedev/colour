import { convertHextoRGB } from "./convertHextoRGB";
import { findNearestEntry } from "./util/findNearestEntry";

/**
 * Finds the hexadecimal colour in a palette that is nearest to the given hex colour, using CIEDE2000.
 *
 * - Returns the palette entry exactly as given (`"#FA0000"` stays `"#FA0000"`).
 * - Entries that are not valid hexadecimal colours are skipped.
 * - Alpha is ignored. When several entries are equally near, the first one wins.
 *
 * @param {string} colour - The hexadecimal colour to find the nearest match for.
 * @param {readonly string[]} palette - The hexadecimal colours to search. It is not modified.
 * @returns {string | null} The nearest palette entry, or `null` if the colour is invalid or the palette is missing or has no valid entry.
 */
export function findNearestHexColour<T extends string>(
	colour: string,
	palette: readonly T[],
): T | null {
	const target = convertHextoRGB(colour);
	if (target === null) return null;
	return findNearestEntry(target, palette, convertHextoRGB);
}
