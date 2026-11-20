import { clamp } from "./index";

import type { RGBColour } from "../types";

function isFiniteNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

/**
 * Parses an RGB object with the `parseColour` rules: `R`, `G` and `B` must be finite
 * numbers, alpha must be missing or finite, and finite out-of-range values are clamped.
 * Always returns a new object, or `null` when the object is invalid.
 */
export function parseRGBObject(value: unknown): RGBColour | null {
	if (typeof value !== "object" || value === null) return null;
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
 * Same validity and channel values as `parseRGBObject`, but returns the object itself
 * instead of a copy when every value is already valid and in range. The returned
 * object may therefore keep `-0` or an explicit `A: undefined`, which don't change
 * the distance. Use `parseRGBObject` when you need a normalized copy.
 *
 * Palette matching only reads the channels to measure distance, so skipping the copy
 * avoids one allocation per palette entry in a hot loop. The inline checks avoid
 * helper calls, which cost noticeably at low JIT tiers (measured for #496). Tests keep
 * this in agreement with `parseRGBObject`.
 */
export function rgbObjectForDistance(value: unknown): RGBColour | null {
	if (typeof value !== "object" || value === null) return null;
	const { R, G, B, A } = value as Record<string, unknown>;
	// NaN and ±Infinity fail the range comparisons, so no separate finiteness check
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
	return parseRGBObject(value);
}
