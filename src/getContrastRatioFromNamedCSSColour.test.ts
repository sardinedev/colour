import { describe, expect, it } from "vitest";
import { getContrastRatioFromNamedCSSColour } from "./getContrastRatioFromNamedCSSColour";
import type { WCAG } from "./types";

describe("getContrastRatioFromNamedCSSColour", () => {
	const standard: WCAG = "WCAG2.1"; // Assuming WCAG2AA is a valid value for WCAG type

	it("should return the correct contrast ratio for black and white", () => {
		const ratio = getContrastRatioFromNamedCSSColour(
			"black",
			"white",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for same colors", () => {
		const ratio = getContrastRatioFromNamedCSSColour(
			"white",
			"white",
			standard,
		);
		expect(ratio).toBe(1);
	});

	it("should return the correct contrast ratio for different colors", () => {
		const ratio = getContrastRatioFromNamedCSSColour("red", "lime", standard);
		expect(ratio).toBe(2.913);
	});

	it("should throw an error for invalid colour name", () => {
		expect(() =>
			// @ts-expect-error - Testing invalid input
			getContrastRatioFromNamedCSSColour("invalid", "lime", standard),
		).toThrow(`getContrastRatioFromNamedCSSColour expects valid CSS named colours.
			invalid or lime are not valid CSS named colours.
			See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`);
	});
});
