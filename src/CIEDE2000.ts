import type { LabColour } from "./types";
import {
	bigSquare,
	deltaHue_d,
	hue_d,
	meanHue_d,
	toRadians,
} from "./util/index";

/**
 * Measures the colour difference between two colours in the Lab space
 *
 * Math taken from:
 *
 * https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 * http://www2.ece.rochester.edu/~gsharma/ciede2000/ciede2000noteCRNA.pdf
 * @param colour1 First colour to be compared
 * @param colour2 First colour to be compared
 */
export function ciede2000(colour1: LabColour, colour2: LabColour): number {
	/** Lightness for colour 1 */
	const lightness1 = colour1.L;

	/** green–red colour opponent for colour 1 */
	const greenRed1 = colour1.a;

	/** blue–yellow colour opponent for colour 1 */
	const blueYellow1 = colour1.b;

	/** Lightness for colour 2 */
	const lightness2 = colour2.L;

	/** green–red colour opponent for colour 2 */
	const greenRed2 = colour2.a;

	/** blue–yellow colour opponent for colour 2 */
	const blueYellow2 = colour2.b;

	/** Weighting factor for Luminance */
	const luminanceWeight = 1;

	/** Weighting factor for Chroma */
	const chromaWeight = 1;

	/** Weighting factor for Hue */
	const hueWeight = 1;

	/** Chroma for colour 1 */
	const chroma1 = Math.sqrt(greenRed1 ** 2 + blueYellow1 ** 2);

	/** Chroma for colour 2 */
	const chroma2 = Math.sqrt(greenRed2 ** 2 + blueYellow2 ** 2);

	/** Derivative of the Lightness difference */
	const deltaLightness = lightness2 - lightness1;

	/** Chroma mean value */
	const meanChroma = (chroma1 + chroma2) / 2;

	const G = 0.5 * (1 - bigSquare(meanChroma));

	/** Derivative of greenRed1 */
	const greenRed1Prime = greenRed1 * (1 + G);

	/** Derivative of greenRed2 */
	const greenRed2Prime = greenRed2 * (1 + G);

	/** Derivative of chroma1 */
	const chroma1Prime = Math.sqrt(greenRed1Prime ** 2 + blueYellow1 ** 2);

	/** Derivative of chroma2 */
	const chroma2Prime = Math.sqrt(greenRed2Prime ** 2 + blueYellow2 ** 2);

	/** Derivative of Chroma mean */
	const meanChromaPrime = (chroma1Prime + chroma2Prime) / 2;

	/** Derivative of the mean difference of Chroma */
	const deltaChromaPrime = chroma2Prime - chroma1Prime;

	/** Derivative of colour 1 Hue */
	const hue1Prime = hue_d(blueYellow1, greenRed1Prime);

	/** Derivative of colour 2 Hue */
	const hue2Prime = hue_d(blueYellow2, greenRed2Prime);

	/** Hue difference */
	const deltaHuePrime = deltaHue_d({
		C1: chroma1,
		C2: chroma2,
		h1_d: hue1Prime,
		h2_d: hue2Prime,
	});

	const deltaHue =
		2 *
		Math.sqrt(chroma1Prime * chroma2Prime) *
		Math.sin(toRadians(deltaHuePrime) / 2);

	/** Derivative of mean hue */
	const meanHuePrime = meanHue_d({
		C1: chroma1,
		C2: chroma2,
		h1_d: hue1Prime,
		h2_d: hue2Prime,
	});

	/** Lightness Mean value*/
	const meanLightness = (lightness1 + lightness2) / 2;

	/** Compensation for neutral colours (the primed values in the L*C*h differences) */
	const T =
		1 -
		0.17 * Math.cos(toRadians(meanHuePrime - 30)) +
		0.24 * Math.cos(toRadians(2 * meanHuePrime)) +
		0.32 * Math.cos(toRadians(3 * meanHuePrime + 6)) -
		0.2 * Math.cos(toRadians(4 * meanHuePrime - 63));

	/** Compensation for lightness */
	const SL =
		1 +
		(0.015 * (meanLightness - 50) ** 2) /
			Math.sqrt(20 + (meanLightness - 50) ** 2);

	/** Compensation for chroma */
	const SC = 0.045 * meanChromaPrime + 1;

	/** Compensation for hue */
	const SH = 1 + 0.015 * meanChromaPrime * T;

	const rotation = 30 * Math.exp(-(((meanHuePrime - 275) / 25) ** 2));

	/** A hue rotation term, to deal with the problematic blue region (hue angles in the neighborhood of 275°) */
	const RT =
		-2 * bigSquare(meanChromaPrime) * Math.sin(toRadians(rotation * 2));

	/** Colour difference */
	const deltaE = Math.sqrt(
		(deltaLightness / (luminanceWeight * SL)) ** 2 +
			(deltaChromaPrime / (chromaWeight * SC)) ** 2 +
			(deltaHue / (hueWeight * SH)) ** 2 +
			RT *
				(deltaChromaPrime / (chromaWeight * SC)) *
				(deltaHue / (hueWeight * SH)),
	);

	return deltaE;
}
