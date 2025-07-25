import { describe, expect, it } from "vitest";
import { getContrastRatioFromCSSRGB } from "./getContrastRatioFromCSSRGB";
import type { WCAG } from "./types";

describe("getContrastRatioFromCSSRGB", () => {
	const standard: WCAG = "WCAG2.1"; // Assuming WCAG2AA is a valid value for WCAG type

	it("should return the correct contrast ratio for black and white", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(0,0,0)",
			"rgb(255,255,255)",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for same colors", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(255,255,255)",
			"rgb(255,255,255)",
			standard,
		);
		expect(ratio).toBe(1);
	});

	it("should return the correct contrast ratio for different colors", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(255,0,0)",
			"rgb(0,255,0)",
			standard,
		);
		expect(ratio).toBe(2.913);
	});

	it("should return the correct contrast ratio within centesimal point", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(18, 52, 86)",
			"rgb(18, 52, 87)",
			standard,
		);
		expect(ratio).toBe(1.001);
	});

	it("should pass the test for the classic rounding issue", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(119 119 119)",
			"rgb(255,255,255)",
			standard,
		);
		expect(ratio).toBe(4.478);
	});

	it("should return the correct contrast ratio for light and dark grey", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(170, 170, 170)",
			"rgb(85, 85, 85)",
			standard,
		);
		expect(ratio).toBe(3.209);
	});

	it("should return the correct contrast ratio for percentage values (black and white)", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(0%, 0%, 0%)",
			"rgb(100%, 100%, 100%)",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for mixed percentage and integer values", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(255, 0%, 0)",
			"rgb(0%, 100%, 0%)",
			standard,
		);
		expect(ratio).toBe(2.913);
	});

	it("should return the correct contrast ratio with RGBA percentage values", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgba(0%, 0%, 0%, 0.8)",
			"rgba(100%, 100%, 100%, 90%)",
			standard,
		);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio with modern slash syntax", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(119 119 119 / 0.9)",
			"rgb(255 255 255 / 0.8)",
			standard,
		);
		expect(ratio).toBe(4.478);
	});

	it("should return the correct contrast ratio with decimal percentage values", () => {
		const ratio = getContrastRatioFromCSSRGB(
			"rgb(66.7% 66.7% 66.7%)",
			"rgb(33.3%, 33.3%, 33.3%)",
			standard,
		);
		expect(ratio).toBe(3.209);
	});
});
