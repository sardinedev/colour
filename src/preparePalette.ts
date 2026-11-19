import { ciede2000 } from "./CIEDE2000";
import { convertRGBtoLab } from "./convertRGBtoLab";
import { parseColour } from "./parseColour";
import type { LabColour, RGBColour } from "./types";
import { parseRGBObject } from "./util/rgbObject";

/** An RGB palette entry as returned by a prepared palette: a frozen copy of the caller's values. */
export type PreparedRGBColour = Readonly<RGBColour>;

/** What a prepared palette returns for an entry type: strings as given, RGB entries as frozen copies. */
export type PreparedEntry<T> = T extends string ? T : PreparedRGBColour;

/** Looks up the entry nearest to `colour` (any colour `parseColour` accepts), or `null`. */
export type PreparedPalette<T> = (colour: unknown) => PreparedEntry<T> | null;

function snapshotRGB(colour: RGBColour): PreparedRGBColour {
	const { R, G, B, A } = colour;
	return Object.freeze(A === undefined ? { R, G, B } : { R, G, B, A });
}

/**
 * SPIKE (#499): not exported from the package root. Measurement-gated; see
 * docs/decisions/0010.
 *
 * Prepares a palette once for repeated nearest-colour lookups. Each valid entry is
 * parsed and converted to Lab a single time; every lookup then converts only the
 * target and runs the same CIEDE2000 scan as `findNearestColour` /
 * `findNearestRGBColour`, with the same rules:
 *
 * - Entries are strings `parseColour` accepts or RGB objects it accepts; others are skipped.
 * - Out-of-range values are clamped for the distance only. Alpha is ignored.
 * - The first of equally near entries wins.
 * - Strings are returned exactly as given. RGB entries are returned as frozen copies
 *   taken at preparation time, not the caller's objects.
 * - Returns `null` for an invalid target or when no entry is valid.
 *
 * The prepared palette is an independent snapshot: later edits to the source array
 * or its objects have no effect, so prepare again after changing the palette.
 */
export function preparePalette<T extends string | RGBColour>(
	palette: readonly T[],
): PreparedPalette<T> {
	const values: PreparedEntry<T>[] = [];
	const labs: LabColour[] = [];

	if (Array.isArray(palette)) {
		for (const entry of palette as readonly unknown[]) {
			if (typeof entry === "string") {
				const rgb = parseColour(entry);
				if (rgb === null) continue;
				values.push(entry as PreparedEntry<T>);
				labs.push(convertRGBtoLab(rgb));
			} else {
				const rgb = parseRGBObject(entry);
				if (rgb === null) continue;
				values.push(snapshotRGB(entry as RGBColour) as PreparedEntry<T>);
				labs.push(convertRGBtoLab(rgb));
			}
		}
	}

	const count = labs.length;
	return (colour: unknown) => {
		if (count === 0) return null;
		const target = parseColour(colour);
		if (target === null) return null;
		const targetLab = convertRGBtoLab(target);
		let nearestIndex = 0;
		let minDistance = Number.POSITIVE_INFINITY;
		for (let index = 0; index < count; index++) {
			const distance = ciede2000(targetLab, labs[index] as LabColour);
			if (distance < minDistance) {
				minDistance = distance;
				nearestIndex = index;
				// An exact match can't be beaten: later entries only win when strictly nearer
				if (distance === 0) break;
			}
		}
		return values[nearestIndex] as PreparedEntry<T>;
	};
}
