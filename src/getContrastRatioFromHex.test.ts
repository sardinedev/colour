import { expect, test } from "vitest";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";
import type { WCAG } from "./types";

const standard: WCAG = "WCAG2.1";

test("should return the correct contrast ratio for black and white", () => {
	const ratio = getContrastRatioFromHex("#000000", "#FFFFFF", standard);
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for same colors", () => {
	const ratio = getContrastRatioFromHex("#FFFFFF", "#FFFFFF", standard);
	expect(ratio).toBe(1);
});

test("should return the correct contrast ratio for different colors", () => {
	const ratio = getContrastRatioFromHex("#FF0000", "#00FF00", standard);
	expect(ratio).toBe(2.913);
});

test("should return the correct contrast ratio within centesimal point", () => {
	const ratio = getContrastRatioFromHex("#123456", "#123457", standard);
	expect(ratio).toBe(1.001);
});

test("should pass the test for the classic rounding issue", () => {
	const ratio = getContrastRatioFromHex("#777777", "#FFFFFF", standard);
	expect(ratio).toBe(4.478);
});

test("should return the correct contrast ratio for light and dark grey", () => {
	const ratio = getContrastRatioFromHex("#AAAAAA", "#555555", standard);
	expect(ratio).toBe(3.209);
});
