import { ciede2000 } from "./CIEDE2000.js";
import { convertRGBtoLab } from "./convertRGBtoLab.js";
import type { RGBColour } from "./types.js";

/**
 * Calculate the distance between two RGB colours using the CIEDE2000 color-difference formula.
 *
 * The CIEDE2000 color-difference formula is a standard method for calculating the perceptual difference
 * between two colors in the CIELAB color space. It takes into account human visual perception and the
 * non-linearities in how we perceive color differences.
 *
 * @param colour1 - The first colour to compare.
 * @param colour2 - The second colour to compare.
 * @returns The distance between the two colours. Smaller numbers (minimum 0) mean the colours are more similar,
 * larger numbers (typically not exceeding 100 for visible colors) indicate more dissimilar colours.
 */
export const RGBdistance = (colour1: RGBColour, colour2: RGBColour): number => {
	const c1 = convertRGBtoLab(colour1);
	const c2 = convertRGBtoLab(colour2);

	return ciede2000(c1, c2);
};
