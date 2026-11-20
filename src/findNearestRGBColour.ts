import { findNearestEntry } from "./util/findNearestEntry";
import { rgbObjectForDistance } from "./util/rgbObject";

import type { RGBColour } from "./types";

/**
 * Finds the RGB colour in a palette that is nearest to the given RGB colour, using CIEDE2000.
 *
 * - Returns the matching palette object itself (same identity), never a copy.
 * - Entries are valid when `R`, `G` and `B` are finite numbers and alpha is missing or a
 *   finite number, as for `parseColour`. Invalid entries are skipped.
 * - Out-of-range channels are clamped for the distance only (`R: 300` is measured as `255`).
 * - Alpha is ignored. When several entries are equally near, the first one wins.
 *
 * @param {RGBColour} colour - The RGB colour to find the nearest match for.
 * @param {readonly RGBColour[]} palette - The RGB colours to search. It is not modified.
 * @returns {RGBColour | null} The nearest palette entry, or `null` if the colour is invalid or the palette is missing or has no valid entry.
 */
export function findNearestRGBColour<T extends RGBColour>(
	colour: RGBColour,
	palette: readonly T[],
): T | null {
	const target = rgbObjectForDistance(colour);
	if (target === null) return null;
	return findNearestEntry(target, palette, rgbObjectForDistance);
}
