import { convertRGBtoLab } from "./convertRGBtoLab";
import { parseColour } from "./parseColour";
import type { LabColour, RGBColour } from "./types";
import { nearestIndex } from "./util/findNearestEntry";
import { rgbObjectForDistance } from "./util/rgbObject";

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

/**
 * Copies an RGB entry's channels into a frozen object the prepared palette owns.
 * Each channel is read exactly once, so getters or later edits can't make the
 * validated values differ from the ones returned. The copy isn't validated yet:
 * callers must check it with `rgbObjectForDistance` before using it.
 */
function ownRGBChannels(entry: unknown): PreparedRGBColour | null {
	if (typeof entry !== "object" || entry === null) {
		return null;
	}
	const { R, G, B, A } = entry as Record<string, unknown>;
	return Object.freeze(
		(A === undefined ? { R, G, B } : { R, G, B, A }) as PreparedRGBColour,
	);
}

/**
 * Prepares a palette once for repeated nearest-colour lookups, using CIEDE2000.
 *
 * Use it when you match many colours against the same palette. Each valid entry is
 * parsed and converted to Lab once, so each lookup only converts the target. On
 * CodSpeed, preparing costs about as much as one `findNearest*` call, and every
 * lookup after that is about 1.45–1.7× faster (decision 0010).
 *
 * Matching works like `findNearestColour`, but also accepts RGB objects:
 *
 * - Entries can be any mix of strings and RGB objects that `parseColour` accepts,
 *   in any format. Invalid entries are skipped. Unlike `findNearestHexColour` and
 *   the other format-specific functions, entries in other formats are **not**
 *   skipped: `preparePalette(["red", "#0000ff"])("#ff0000")` returns `"red"`.
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
			let value: PreparedEntry<T> | null;
			let rgb: RGBColour | null;
			if (typeof entry === "string") {
				value = entry as PreparedEntry<T>;
				rgb = parseColour(entry);
			} else {
				// Validate and return the same owned copy, never the caller's object.
				// rgbObjectForDistance only copies again when it has to clamp.
				const owned = ownRGBChannels(entry);
				value = owned as PreparedEntry<T> | null;
				rgb = rgbObjectForDistance(owned);
			}
			if (rgb === null) {
				continue;
			}
			values.push(value as PreparedEntry<T>);
			labs.push(convertRGBtoLab(rgb));
		}
	}

	if (labs.length === 0) {
		return () => null;
	}
	const count = labs.length;
	const labAt = (index: number) => labs[index] as LabColour;
	return (colour: string | RGBColour) => {
		// Objects skip the copy that parseColour would make, as in findNearestRGBColour
		const target =
			typeof colour === "string"
				? parseColour(colour)
				: rgbObjectForDistance(colour);
		if (target === null) {
			return null;
		}
		const index = nearestIndex(convertRGBtoLab(target), count, labAt);
		return values[index] as PreparedEntry<T>;
	};
}
