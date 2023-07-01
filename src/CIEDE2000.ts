import {
	bigSquare,
	deltaHue_d,
	hue_d,
	meanHue_d,
	toRadians,
} from "./util/index.js";
import type { LabColour } from "./types.js";

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
export function ciede2000(colour1: LabColour, colour2: LabColour): number {
	/**
	 * Glossary
	 * L - Lightness as defined by L*a*b*
	 * a - Describes the green–red opponent colors as defined by L*a*b*
	 * b - Describes the blue–yellow opponent colors as defined by L*a*b*
	 * C - Chroma as defined by CIE94
	 *
	 * Math notation
	 * _d - Derivative
	 * Δ - Difference between values
	 * ̅  - Mean value
	 */

	/** Lightness for colour 1 */
	const L1 = colour1.L;

	/** green–red colour opponent for colour 1 */
	const a1 = colour1.a;

	/** blue–yellow colour opponent for colour 1 */
	const b1 = colour1.b;

	/** Lightness for colour 2 */
	const L2 = colour2.L;

	/** green–red colour opponent for colour 1 */
	const a2 = colour2.a;

	/** blue–yellow colour opponent for colour 1 */
	const b2 = colour2.b;

	/** Weighting factor for Luminance */
	const kL = 1;

	/** Weighting factor for Chroma */
	const kC = 1;

	/** Weighting factor for Hue */
	const kH = 1;

	/** Chroma for colour 1 */
	const C1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));

	/** Chroma for colour 2 */
	const C2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));

	/** Derivative of the Lightness difference */
	const ΔL_d = L2 - L1;

	/** Chroma mean value */
	const C̅ = (C1 + C2) / 2;

	const G = 0.5 * (1 - bigSquare(C̅));

	/** Derivative of a1 */
	const a1_d = a1 * (1 + G);

	/** Derivative of a2 */
	const a2_d = a2 * (1 + G);

	/** Derivative of C1 */
	const C1_d = Math.sqrt(Math.pow(a1_d, 2) + Math.pow(b1, 2));

	/** Derivative of C2 */
	const C2_d = Math.sqrt(Math.pow(a2_d, 2) + Math.pow(b2, 2));

	/** Derivative of Chroma mean */
	const C̅_d = (C1_d + C2_d) / 2;

	/** Derivative of the mean difference of Chroma */
	const ΔC̅_d = C2_d - C1_d;

	/** Derivative of colour 1 Hue */
	const h1_d = hue_d(b1, a1_d);

	/** Derivative of colour 2 Hue */
	const h2_d = hue_d(b2, a2_d);

	/** Hue difference */
	const Δh_d = deltaHue_d({ C1, C2, h1_d, h2_d });

	const ΔH_d = 2 * Math.sqrt(C1_d * C2_d) * Math.sin(toRadians(Δh_d) / 2);

	/** Derivative of mean hue */
	const H̅_d = meanHue_d({ C1, C2, h1_d, h2_d });

	/** Lightness Mean value*/
	const L̅ = (L1 + L2) / 2;

	/** Compensation for neutral colors (the primed values in the L*C*h differences) */
	const T =
		1 -
		0.17 * Math.cos(toRadians(H̅_d - 30)) +
		0.24 * Math.cos(toRadians(2 * H̅_d)) +
		0.32 * Math.cos(toRadians(3 * H̅_d + 6)) -
		0.2 * Math.cos(toRadians(4 * H̅_d - 63));

	/** Compensation for lightness */
	const SL =
		1 + (0.015 * Math.pow(L̅ - 50, 2)) / Math.sqrt(20 + Math.pow(L̅ - 50, 2));

	/** Compensation for chroma */
	const SC = 0.045 * C̅_d + 1;

	/** Compensation for hue */
	const SH = 1 + 0.015 * C̅_d * T;

	const rotation = 30 * Math.exp(-Math.pow((H̅_d - 275) / 25, 2));

	/** A hue rotation term, to deal with the problematic blue region (hue angles in the neighborhood of 275°) */
	const RT = -2 * bigSquare(C̅_d) * Math.sin(toRadians(rotation * 2));

	/** Colour difference */
	const ΔE = Math.sqrt(
		Math.pow(ΔL_d / (kL * SL), 2) +
			Math.pow(ΔC̅_d / (kC * SC), 2) +
			Math.pow(ΔH_d / (kH * SH), 2) +
			RT * (ΔC̅_d / (kC * SC)) * (ΔH_d / (kH * SH)),
	);

	return ΔE;
}
