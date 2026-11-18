import { isNamedCSSColour } from "./assertions";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";
import type { RGBColour } from "./types";
import { clamp } from "./util/index";

function isFiniteNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

/**
 * Validates an RGB object with the same rules as `parseColour`, for use in hot loops.
 * Returns the object itself when every value is already in range, a clamped copy when
 * a finite value is out of range, and `null` when it is invalid.
 *
 * @internal Used by `findNearestRGBColour`, which must return the original object.
 */
export function validRGBObject(value: unknown): RGBColour | null {
	if (typeof value !== "object" || value === null) return null;
	const { R, G, B, A } = value as Record<string, unknown>;
	// Fast path with inline checks: NaN and ±Infinity fail the range comparisons
	if (
		typeof R === "number" &&
		R >= 0 &&
		R <= 255 &&
		typeof G === "number" &&
		G >= 0 &&
		G <= 255 &&
		typeof B === "number" &&
		B >= 0 &&
		B <= 255 &&
		(A === undefined || (typeof A === "number" && A >= 0 && A <= 1))
	) {
		return value as RGBColour;
	}
	// Out of range or invalid: apply the full parseColour rules (clamp or reject)
	return parseRGBObject(value);
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
		// Each converter validates its own format, so pick one and let it decide
		if (colour.startsWith("#")) return convertHextoRGB(colour);
		return (
			convertCSSRGBtoRGB(colour) ??
			(isNamedCSSColour(colour) ? convertNamedCSSColourtoRGB(colour) : null)
		);
	}
	if (typeof colour === "object" && colour !== null) {
		return parseRGBObject(colour);
	}
	return null;
}
