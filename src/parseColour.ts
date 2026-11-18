import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "./assertions";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";
import type { RGBColour } from "./types";
import { clamp } from "./util/index";

function isFiniteNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function parseRGBObject(value: object): RGBColour | null {
	const { R, G, B, A } = value as Record<string, unknown>;
	if (!isFiniteNumber(R) || !isFiniteNumber(G) || !isFiniteNumber(B)) {
		return null;
	}
	const rgb: RGBColour = {
		R: clamp(R, 0, 255),
		G: clamp(G, 0, 255),
		B: clamp(B, 0, 255),
	};
	if (A === undefined) return rgb;
	if (!isFiniteNumber(A)) return null;
	rgb.A = clamp(A, 0, 1);
	return rgb;
}

/**
 * Parses any supported colour into a new RGB colour object.
 *
 * Accepts hexadecimal strings (`#fff`, `#ffffff80`), CSS RGB strings (`rgb(255 0 0 / 50%)`),
 * named CSS colours (`hotpink`) and RGB objects (`{ R: 255, G: 0, B: 0, A: 0.5 }`).
 *
 * - Fractional channels are kept.
 * - Finite out-of-range values are clamped: RGB channels to 0–255 and alpha to 0–1.
 * - A missing alpha is left out of the result, which means opaque.
 * - RGB objects with a missing or non-finite R, G or B, or a non-finite alpha, are rejected.
 *
 * Use this to tell an invalid colour apart from a `false` result in predicates such as `isDarkColour`.
 *
 * @param {unknown} colour - The value to parse.
 * @returns {RGBColour | null} A new RGB colour object, or `null` if the value is not a supported colour.
 */
export function parseColour(colour: unknown): RGBColour | null {
	if (typeof colour === "string") {
		if (isHexColour(colour)) return convertHextoRGB(colour);
		if (isCSSRGBColour(colour)) return convertCSSRGBtoRGB(colour);
		if (isNamedCSSColour(colour)) return convertNamedCSSColourtoRGB(colour);
		return null;
	}
	if (typeof colour === "object" && colour !== null) {
		return parseRGBObject(colour);
	}
	return null;
}
