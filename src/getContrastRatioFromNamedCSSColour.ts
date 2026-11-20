import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";

import type { NamedCSSColour } from "./types";

/**
 * Calculates the contrast ratio between two named CSS colours.
 *
 * See list here https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param colour1 The first named CSS colour
 * @param colour2 The second named CSS colour
 * @returns The unrounded contrast ratio between the two colours, or `null` if either name is not a named CSS colour
 */
export function getContrastRatioFromNamedCSSColour(
	colour1: NamedCSSColour,
	colour2: NamedCSSColour,
): number | null {
	const hexColour1 = convertNamedCSSColourtoHex(colour1);
	const hexColour2 = convertNamedCSSColourtoHex(colour2);
	if (hexColour1 === null || hexColour2 === null) return null;
	return getContrastRatioFromHex(hexColour1, hexColour2);
}
