import { expect, test } from "vitest";
import { getContrastRatioFromNamedCSSColour } from "./getContrastRatioFromNamedCSSColour";

test("should return the correct contrast ratio for black and white", () => {
	const ratio = getContrastRatioFromNamedCSSColour("black", "white");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for same colors", () => {
	const ratio = getContrastRatioFromNamedCSSColour("white", "white");
	expect(ratio).toBe(1);
});

test("should return the correct contrast ratio for different colors", () => {
	const ratio = getContrastRatioFromNamedCSSColour("red", "lime");
	expect(ratio).toBeCloseTo(2.9139375476, 9);
});

test("should return null for an invalid colour name in either position", () => {
	// @ts-expect-error - Testing invalid input
	expect(getContrastRatioFromNamedCSSColour("invalid", "lime")).toBeNull();
	// @ts-expect-error - Testing invalid input
	expect(getContrastRatioFromNamedCSSColour("lime", "invalid")).toBeNull();
});
