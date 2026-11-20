import { ciede2000 } from "../CIEDE2000";
import { convertRGBtoLab } from "../convertRGBtoLab";

import type { LabColour, RGBColour } from "../types";

/**
 * The one CIEDE2000 scan shared by `findNearest*` and `preparePalette`, so their
 * selection rules can't drift apart.
 *
 * `labAt(index)` returns the Lab value of entry `index`, or `null` to skip it.
 * Equal distances keep the first entry, and the scan stops at an exact match.
 * Returns the index of the nearest entry, or -1 when no entry is valid.
 *
 * @internal
 */
export function nearestIndex(
	targetLab: LabColour,
	count: number,
	labAt: (index: number) => LabColour | null,
): number {
	let nearest = -1;
	let minDistance = Number.POSITIVE_INFINITY;
	for (let index = 0; index < count; index++) {
		const lab = labAt(index);
		if (lab === null) {
			continue;
		}
		const distance = ciede2000(targetLab, lab);
		if (distance < minDistance) {
			minDistance = distance;
			nearest = index;
			// An exact match can't be beaten: later entries only win when strictly nearer
			if (distance === 0) {
				break;
			}
		}
	}
	return nearest;
}

/**
 * Scans a palette once and returns the entry nearest to `colour` by CIEDE2000.
 *
 * Entries that `toRGB` maps to `null` are skipped. The original entry is returned,
 * never a converted copy. Returns `null` when the palette is missing or has no
 * valid entry. Selection rules are those of `nearestIndex`.
 *
 * @internal Shared by the `findNearest*` functions.
 */
export function findNearestEntry<T>(
	colour: RGBColour,
	palette: readonly T[] | null | undefined,
	toRGB: (entry: T) => RGBColour | null,
): T | null {
	if (!Array.isArray(palette)) {
		return null;
	}
	const index = nearestIndex(convertRGBtoLab(colour), palette.length, (i) => {
		const rgb = toRGB(palette[i] as T);
		return rgb === null ? null : convertRGBtoLab(rgb);
	});
	return index === -1 ? null : (palette[index] as T);
}
