import type { LabColour } from "./types";
/**
 * Mesures the colour difference between two colours in the Lab space
 *
 * Math taken from:
 *
 * https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 * http://www2.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
 * @param colour1 First colour to be compared
 * @param colour2 First colour to be compared
 */
export declare function ciede2000(
	colour1: LabColour,
	colour2: LabColour,
): number;
