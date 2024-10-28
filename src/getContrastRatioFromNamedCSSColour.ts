import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";
import type { NamedCSSColour, WCAG } from "./types";

/**
 * Calculates the contrast ratio between two named CSS colours in.
 *
 * See list here https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param colour1 The first named CSS colour
 * @param colour2 The second named CSS colour
 * @param standard The standard to evaluate the contrast ratio against, defaults to WCAG2.1
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function getContrastRatioFromNamedCSSColour(
	colour1: NamedCSSColour,
	colour2: NamedCSSColour,
	standard: WCAG,
): number {
	const hexColour1 = convertNamedCSSColourtoHex(colour1);
	const hexColour2 = convertNamedCSSColourtoHex(colour2);

	if (hexColour1 === undefined || hexColour2 === undefined) {
		throw new Error(
			`getContrastRatioFromNamedCSSColour expects valid CSS named colours.
			${colour1} or ${colour2} are not valid CSS named colours.
			See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`,
		);
	}

	return getContrastRatioFromHex(hexColour1, hexColour2, standard);
}
