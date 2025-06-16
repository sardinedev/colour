import { describe, expect, it } from "vitest";
import { getContrastRatio } from "./getContrastRatio";
import type { WCAG } from "./types";

describe("getContrastRatio", () => {
	const standard: WCAG = "WCAG2.1"; // Assuming WCAG2AA is a valid value for WCAG type

	it("should return the correct contrast ratio for black and white when we mix different colour formats", () => {
		const ratio = getContrastRatio("black", "rgb(255,255,255)", standard);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for same colors when we mix different colour formats", () => {
		const ratio = getContrastRatio("#FFFFFF", "rgb(255,255,255)", standard);
		expect(ratio).toBe(1);
	});

	it("should return the correct contrast ratio for different colors when we mix different colour formats", () => {
		const ratio = getContrastRatio("red", "#00FF00", standard);
		expect(ratio).toBe(2.913);
	});

	it("should return the correct contrast ratio within centesimal point when we mix different colour formats", () => {
		const ratio = getContrastRatio("#123456", "rgb(18, 52, 87)", standard);
		expect(ratio).toBe(1.001);
	});

	it("should pass the test for the classic rounding issue when we mix different colour formats", () => {
		const ratio = getContrastRatio("#777777", "rgb(255,255,255)", standard);
		expect(ratio).toBe(4.478);
	});

	it("should return the correct contrast ratio for light and dark grey when we mix different colour formats", () => {
		const ratio = getContrastRatio("rgb(170, 170, 170)", "#555555", standard);
		expect(ratio).toBe(3.209);
	});

	it("should throw an error for invalid colour name", () => {
		expect(() => getContrastRatio("invalid", "lime", standard)).toThrow(
			`getContrastRatio expects valid CSS named colours.
					invalid is not a valid CSS named colour.
					See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`,
		);
	});

	it("should return the correct contrast ratio for two hexadecimal colors", () => {
		const ratio = getContrastRatio("#000000", "#FFFFFF", standard);
		expect(ratio).toBe(21);
	});

	it("should throw an error for invalid CSS RGB color", () => {
		expect(() =>
			getContrastRatio("rgb(300,300,300)", "invalid2", standard),
		).toThrow(
			`getContrastRatio expects valid CSS named colours.
					invalid2 is not a valid CSS named colour.
					See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color`,
		);
	});

	it("should accept a Named CSS Colour as the second argument", () => {
		const ratio = getContrastRatio("#000", "white", standard);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for CSS RGB with percentage values", () => {
		const ratio = getContrastRatio(
			"rgb(0%, 0%, 0%)",
			"rgb(100%, 100%, 100%)",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for mixed percentage and integer CSS RGB values", () => {
		const ratio = getContrastRatio(
			"rgb(255, 0%, 0)",
			"rgb(0%, 100%, 0%)",
			standard,
		);
		expect(ratio).toBe(2.913);
	});

	it("should return the correct contrast ratio for RGBA with percentage values", () => {
		const ratio = getContrastRatio(
			"rgba(0%, 0%, 0%, 0.8)",
			"rgba(100%, 100%, 100%, 90%)",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio when mixing hex and percentage CSS RGB", () => {
		const ratio = getContrastRatio(
			"#777777",
			"rgb(100%, 100%, 100%)",
			standard,
		);
		expect(ratio).toBe(4.478);
	});

	it("should return the correct contrast ratio when mixing named colors and percentage CSS RGB", () => {
		const ratio = getContrastRatio("black", "rgb(100%, 100%, 100%)", standard);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for decimal percentage values", () => {
		const ratio = getContrastRatio(
			"rgb(66.7%, 66.7%, 66.7%)",
			"rgb(33.3%, 33.3%, 33.3%)",
			standard,
		);
		expect(ratio).toBe(3.209);
	});
});
