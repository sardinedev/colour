import { expect, test } from "vitest";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";

test("should return the correct contrast ratio for black and white", () => {
	const ratio = getContrastRatioFromHex("#000000", "#FFFFFF");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for same colors", () => {
	const ratio = getContrastRatioFromHex("#FFFFFF", "#FFFFFF");
	expect(ratio).toBe(1);
});

test("should return the correct contrast ratio for different colors", () => {
	const ratio = getContrastRatioFromHex("#FF0000", "#00FF00");
	expect(ratio).toBeCloseTo(2.9139375476, 9);
});

test("should return the correct contrast ratio within centesimal point", () => {
	const ratio = getContrastRatioFromHex("#123456", "#123457");
	expect(ratio).toBeCloseTo(1.0019662402, 9);
});

test("should pass the test for the classic rounding issue", () => {
	const ratio = getContrastRatioFromHex("#777777", "#FFFFFF");
	expect(ratio).toBeCloseTo(4.4780894536, 9);
});

test("should return the correct contrast ratio for light and dark grey", () => {
	const ratio = getContrastRatioFromHex("#AAAAAA", "#555555");
	expect(ratio).toBeCloseTo(3.2091187762, 9);
});

test("should return null for an invalid colour in either position", () => {
	expect(getContrastRatioFromHex("#12345", "#fff")).toBeNull();
	expect(getContrastRatioFromHex("#fff", "#12345")).toBeNull();
});

test("returns the unrounded ratio so thresholds are not shifted", () => {
	// 4.4780894... used to be truncated to 4.478; it must stay below 4.5 either way
	const ratio = getContrastRatioFromHex("#777777", "#ffffff");
	expect(ratio).toBeLessThan(4.5);
	expect(ratio).not.toBe(4.478);
});
