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
	expect(ratio).toBe(2.913);
});

test("should throw an error for invalid colour name", () => {
	expect(() =>
		// @ts-expect-error - Testing invalid input
		getContrastRatioFromNamedCSSColour("invalid", "lime"),
	).toThrow(
		`getContrastRatioFromNamedCSSColour expects valid CSS named colours. invalid or lime are not valid CSS named colours. See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`,
	);
});
