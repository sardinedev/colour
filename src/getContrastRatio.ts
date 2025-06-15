import { convertCSSRGBtoHex } from "./convertCSSRGBtoHex";
import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";
import type { NamedCSSColour, WCAG } from "./types";

/**
 * Calculates the contrast ratio between two colours.
 * Accepts CSS RGB colours (including percentage values), named CSS colours, or hexadecimal colours.
 * @param colour1 The first colour (e.g., `#ff0000`, `rgb(255,0,0)`, `rgb(100%, 0%, 0%)`, or `red`)
 * @param colour2 The second colour (e.g., `#00ff00`, `rgb(0,255,0)`, `rgb(0%, 100%, 0%)`, or `lime`)
 * @param standard The standard to evaluate the contrast ratio against, defaults to WCAG2.1
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function getContrastRatio(
	colour1: string | NamedCSSColour,
	colour2: string | NamedCSSColour,
	standard: WCAG,
): number {
	// The colour can be a named CSS colour, a CSS RGB colour or a hexadecimal colour
	// So we normalize the input to a hexadecimal colour
	let hexColour1: string;
	let hexColour2: string;
	if (colour1.startsWith("#")) {
		hexColour1 = colour1;
	} else if (colour1.startsWith("rgb")) {
		hexColour1 = convertCSSRGBtoHex(colour1);
	} else {
		const _hexColour1 = convertNamedCSSColourtoHex(colour1 as NamedCSSColour);
		if (_hexColour1 === undefined) {
			throw new Error(
				`getContrastRatio expects valid CSS named colours.
					${colour1} is not a valid CSS named colour.
					See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`,
			);
		}
		hexColour1 = _hexColour1;
	}

	if (colour2.startsWith("#")) {
		hexColour2 = colour2;
	} else if (colour2.startsWith("rgb")) {
		hexColour2 = convertCSSRGBtoHex(colour2);
	} else {
		const _hexColour2 = convertNamedCSSColourtoHex(colour2 as NamedCSSColour);
		if (_hexColour2 === undefined) {
			throw new Error(`getContrastRatio expects valid CSS named colours.
					${colour2} is not a valid CSS named colour.
					See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`);
		}
		hexColour2 = _hexColour2;
	}

	return getContrastRatioFromHex(hexColour1, hexColour2, standard);
}
