import { convertHextoRGB } from "./convertHextoRGB";
import { convertRGBtoHSV } from "./convertRGBtoHSV";

/**
 * Helper to parse hex and get HSV + alpha
 * @param hex Hex color string
 * @returns Object with hue, saturation, value, and alpha
 */
// Helper to parse hex and get HSV + alpha
function getColorInfo(hex: string) {
	const { R, G, B, A } = convertHextoRGB(hex);
	// If A (alpha) is not defined, assume fully opaque
	const a = typeof A === "number" ? A : 1;
	const { h, s, v } = convertRGBtoHSV(R, G, B);
	return { h, s, v, a };
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
	// Partition colours
	const normal: string[] = [];
	const greyscale: string[] = [];
	const transparent: string[] = [];

	for (const hex of hexColours) {
		const { s, a } = getColorInfo(hex);
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
		const ca = getColorInfo(a);
		const cb = getColorInfo(b);
		if (ca.h !== cb.h) return ca.h - cb.h;
		return cb.s - ca.s; // descending saturation
	});

	// Sort greyscale by value (brightness)
	greyscale.sort((a, b) => {
		const ca = getColorInfo(a);
		const cb = getColorInfo(b);
		return cb.v - ca.v;
	});

	// Transparent colours: keep order
	return [...normal, ...greyscale, ...transparent];
}
