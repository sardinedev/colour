import { convertHextoRGB } from "./convertHextoRGB";
import { convertRGBtoHSV } from "./convertRGBtoHSV";

/**
 * Helper to parse hex and get HSV + alpha
 * @param hex Hex color string
 * @returns Object with hue, saturation, value, and alpha
 */
export function getColorInfo(hex: string) {
	const { R, G, B, A } = convertHextoRGB(hex);
	// If A (alpha) is not defined, assume fully opaque
	const a = typeof A === "number" ? A : 1;
	const { h, s, v } = convertRGBtoHSV(R, G, B);
	return { h, s, v, a };
}

/**
 * Helper to get custom order for greyscale values
 * @param v HSV value (brightness) from 0 to 1
 * @returns Order priority: 0 for gray/other, 1 for black, 2 for white
 */
export function getGreyscaleOrder(v: number): number {
	if (v === 0) return 1; // black second
	if (v === 1) return 2; // white last
	return 0; // gray and other values first
}

/**
 * Sorts an array of hex colours by hue, then by saturation.
 * Colours with 0% saturation (greyscale) are shifted to the end.
 * Fully transparent colours (alpha = 0) are placed at the very end.
 * Accepts hex colours in #RRGGBB or #RRGGBBAA format.
 * @param hexColours Array of hex colour strings
 * @returns Sorted array of hex colour strings
 */
export function sortHexColours(hexColours: string[]): string[] {
	// Precompute HSV+alpha for each colour once — O(n) — so comparators can reuse cached values instead of recomputing colour info
	// don't repeat the hex→RGB→HSV conversion chain on every comparison.
	// Use a loop instead of new Map(array.map(...)) to avoid the intermediate
	// array allocation, and skip duplicates to avoid redundant conversions.
	const cache = new Map<string, ReturnType<typeof getColorInfo>>();
	for (const hex of hexColours) {
		if (!cache.has(hex)) {
			cache.set(hex, getColorInfo(hex));
		}
	}

	// Partition colours
	const normal: string[] = [];
	const greyscale: string[] = [];
	const transparent: string[] = [];

	for (const hex of hexColours) {
		// biome-ignore lint/style/noNonNullAssertion: key was just inserted above
		const { s, a } = cache.get(hex)!;
		if (a === 0) {
			transparent.push(hex);
		} else if (s === 0) {
			greyscale.push(hex);
		} else {
			normal.push(hex);
		}
	}

	// Sort normal colours by hue, then saturation
	normal.sort((a, b) => {
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const ca = cache.get(a)!;
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const cb = cache.get(b)!;
		if (ca.h !== cb.h) return ca.h - cb.h;
		return cb.s - ca.s; // descending saturation
	});

	// Sort greyscale by a custom order: gray, black, white for common values
	greyscale.sort((a, b) => {
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const ca = cache.get(a)!;
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const cb = cache.get(b)!;

		const orderA = getGreyscaleOrder(ca.v);
		const orderB = getGreyscaleOrder(cb.v);

		if (orderA !== orderB) {
			return orderA - orderB;
		}

		// For values not in the custom order, sort by value
		return ca.v - cb.v;
	});

	// Sort transparent colours by value (brightness)
	transparent.sort((a, b) => {
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const ca = cache.get(a)!;
		// biome-ignore lint/style/noNonNullAssertion: all keys are in cache
		const cb = cache.get(b)!;
		return ca.v - cb.v;
	});

	return [...normal, ...greyscale, ...transparent];
}
