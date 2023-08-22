import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "./assertions.js";
import { findNearestCSSRGBColour } from "./findNearestCSSRGBColour.js";
import { findNearestHexColour } from "./findNearestHexColour.js";
import { findNearestNamedCSSColour } from "./findNearestNamedCSSColour.js";
import type { NamedCSSColour } from "./types.js";

export function findNearestColour(
	colour: string | NamedCSSColour,
	palette: string[] | NamedCSSColour[],
): string {
	if (!palette || palette.length < 2) {
		return colour;
	}

	if (isHexColour(colour)) {
		return findNearestHexColour(colour, palette);
	}

	if (isCSSRGBColour(colour)) {
		return findNearestCSSRGBColour(colour, palette);
	}
	// @ts-ignore
	if (isNamedCSSColour(colour)) {
		return findNearestNamedCSSColour(colour, palette as NamedCSSColour[]);
	}

	return colour;
}
