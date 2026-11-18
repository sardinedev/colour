import { ciede2000 } from "../CIEDE2000";
import { convertRGBtoLab } from "../convertRGBtoLab";
import type { RGBColour } from "../types";

/**
 * Scans a palette once and returns the entry nearest to `colour` by CIEDE2000.
 *
 * Entries that `toRGB` maps to `null` are skipped. Equal distances keep the first
 * entry, and the scan stops at an exact match. The original entry is returned,
 * never a converted copy. Returns `null`
 * when the palette is missing or has no valid entry.
 *
 * @internal Shared by the `findNearest*` functions.
 */
export function findNearestEntry<T>(
	colour: RGBColour,
	palette: readonly T[] | null | undefined,
	toRGB: (entry: T) => RGBColour | null,
): T | null {
	if (!Array.isArray(palette)) return null;
	const colourLab = convertRGBtoLab(colour);
	let nearestIndex = -1;
	let minDistance = Number.POSITIVE_INFINITY;
	for (let index = 0; index < palette.length; index++) {
		const rgb = toRGB(palette[index] as T);
		if (rgb === null) continue;
		const distance = ciede2000(colourLab, convertRGBtoLab(rgb));
		if (distance < minDistance) {
			minDistance = distance;
			nearestIndex = index;
			// An exact match can't be beaten: later entries only win when strictly nearer
			if (distance === 0) break;
		}
	}
	return nearestIndex === -1 ? null : (palette[nearestIndex] as T);
}
