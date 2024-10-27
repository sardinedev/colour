import { describe, expect, it } from "vitest";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";
import type { WCAG } from "./types";

describe("getContrastRatioFromHex", () => {
	const standard: WCAG = "WCAG2.1"; // Assuming WCAG2AA is a valid value for WCAG type

	it("should return the correct contrast ratio for black and white", () => {
		const ratio = getContrastRatioFromHex("#000000", "#FFFFFF", standard);
		expect(ratio).toBe(21);
	});

	it("should return the correct contrast ratio for same colors", () => {
		const ratio = getContrastRatioFromHex("#FFFFFF", "#FFFFFF", standard);
		expect(ratio).toBe(1);
	});

	it("should return the correct contrast ratio for different colors", () => {
		const ratio = getContrastRatioFromHex("#FF0000", "#00FF00", standard);
		expect(ratio).toBe(2.913);
	});

	it("should return the correct contrast ratio within centesimal point", () => {
		const ratio = getContrastRatioFromHex("#123456", "#123457", standard);
		expect(ratio).toBe(1.001);
	});

	it("should pass the test for the classic rounding issue", () => {
		const ratio = getContrastRatioFromHex("#777777", "#FFFFFF", standard);
		expect(ratio).toBe(4.478);
	});

	it("should return the correct contrast ratio for light and dark grey", () => {
		const ratio = getContrastRatioFromHex("#AAAAAA", "#555555", standard);
		expect(ratio).toBe(3.209);
	});
});
