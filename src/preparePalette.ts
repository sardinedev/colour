import { ciede2000 } from "./CIEDE2000";
import { convertRGBtoLab } from "./convertRGBtoLab";
import { parseColour } from "./parseColour";
import type { LabColour, RGBColour } from "./types";
import { parseRGBObject } from "./util/rgbObject";

/** An RGB palette entry as returned by a prepared palette: a frozen copy of the caller's values. */
export interface PreparedRGBColour {
	readonly R: number;
	readonly G: number;
	readonly B: number;
	readonly A?: number | undefined;
}

/** What a prepared palette returns for an entry type: strings as given, RGB entries as frozen copies. */
export type PreparedEntry<T> = T extends string ? T : PreparedRGBColour;

/**
 * Looks up the palette entry nearest to `colour` (any string or RGB object that
 * `parseColour` accepts). Returns `null` for an invalid colour or an empty palette.
 */
export type PreparedPalette<T> = (
	colour: string | RGBColour,
) => PreparedEntry<T> | null;

function snapshotRGB(colour: RGBColour): PreparedRGBColour {
	const { R, G, B, A } = colour;
	return Object.freeze(A === undefined ? { R, G, B } : { R, G, B, A });
}

/**
 * Prepares a palette once for repeated nearest-colour lookups, using CIEDE2000.
 *
 * Use it when you match many colours against the same palette. Each valid entry is
 * parsed and converted to Lab once, so each lookup only converts the target. On
 * CodSpeed, preparing costs about as much as one `findNearest*` call, and every
 * lookup after that is about 1.5–1.7× faster (decision 0010).
 *
 * Results follow the `findNearest*` rules:
 *
 * - Entries can be any mix of strings and RGB objects that `parseColour` accepts.
 *   Invalid entries are skipped.
 * - Out-of-range values are clamped for the distance only. Alpha is ignored.
 * - The first of equally near entries wins.
 * - Strings are returned exactly as given. RGB entries are returned as frozen copies
 *   taken at preparation time, not your original objects.
 * - A lookup returns `null` for an invalid colour, or when the palette has no valid entry.
 *
 * The prepared palette is an independent snapshot: later changes to your array or
 * its objects have no effect, so prepare again after changing the palette. Nothing
 * is cached globally.
 *
 * @example
 * ```ts
 * const nearestBrandColour = preparePalette(["#0055ff", "#ff3366", "rebeccapurple"]);
 * nearestBrandColour("#1060f0"); //=> "#0055ff"
 * nearestBrandColour("rgb(250 40 90)"); //=> "#ff3366"
 * ```
 *
 * @param {readonly (string | RGBColour)[]} palette - The colours to match against. It is not modified.
 * @returns {PreparedPalette} A function that returns the nearest entry for a colour, or `null`.
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
				if (rgb === null) {
					continue;
				}
				values.push(entry as PreparedEntry<T>);
				labs.push(convertRGBtoLab(rgb));
			} else {
				const rgb = parseRGBObject(entry);
				if (rgb === null) {
					continue;
				}
				values.push(snapshotRGB(entry as RGBColour) as PreparedEntry<T>);
				labs.push(convertRGBtoLab(rgb));
			}
		}
	}

	const count = labs.length;
	return (colour: string | RGBColour) => {
		if (count === 0) {
			return null;
		}
		const target = parseColour(colour);
		if (target === null) {
			return null;
		}
		const targetLab = convertRGBtoLab(target);
		let nearestIndex = 0;
		let minDistance = Number.POSITIVE_INFINITY;
		for (let index = 0; index < count; index++) {
			const distance = ciede2000(targetLab, labs[index] as LabColour);
			if (distance < minDistance) {
				minDistance = distance;
				nearestIndex = index;
				// An exact match can't be beaten: later entries only win when strictly nearer
				if (distance === 0) {
					break;
				}
			}
		}
		return values[nearestIndex] as PreparedEntry<T>;
	};
}
