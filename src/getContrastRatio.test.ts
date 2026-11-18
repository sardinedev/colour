import { expect, test } from "vitest";
import { getContrastRatio } from "./getContrastRatio";
import { getContrastRatioFromCSSRGB } from "./getContrastRatioFromCSSRGB";

test("should return the correct contrast ratio for black and white when we mix different colour formats", () => {
	const ratio = getContrastRatio("black", "rgb(255,255,255)");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for same colors when we mix different colour formats", () => {
	const ratio = getContrastRatio("#FFFFFF", "rgb(255,255,255)");
	expect(ratio).toBe(1);
});

test("should return the correct contrast ratio for different colors when we mix different colour formats", () => {
	const ratio = getContrastRatio("red", "#00FF00");
	expect(ratio).toBeCloseTo(2.9139375476, 9);
});

test("should return the correct contrast ratio within centesimal point when we mix different colour formats", () => {
	const ratio = getContrastRatio("#123456", "rgb(18, 52, 87)");
	expect(ratio).toBeCloseTo(1.0019662402, 9);
});

test("should pass the test for the classic rounding issue when we mix different colour formats", () => {
	const ratio = getContrastRatio("#777777", "rgb(255,255,255)");
	expect(ratio).toBeCloseTo(4.4780894536, 9);
});

test("should return the correct contrast ratio for light and dark grey when we mix different colour formats", () => {
	const ratio = getContrastRatio("rgb(170, 170, 170)", "#555555");
	expect(ratio).toBeCloseTo(3.2091187762, 9);
});

test("should return null for an invalid colour in either position", () => {
	expect(getContrastRatio("invalid", "lime")).toBeNull();
	expect(getContrastRatio("lime", "invalid")).toBeNull();
	expect(getContrastRatio("#12345", "#fff")).toBeNull();
	expect(getContrastRatio("#fff", "rgb(1, 2)")).toBeNull();
});

test("should return null for non-string input from JavaScript callers", () => {
	// @ts-expect-error - checking runtime behaviour for JS consumers
	expect(getContrastRatio(null, "#fff")).toBeNull();
	// @ts-expect-error - RGB objects are only accepted by parseColour
	expect(getContrastRatio("#fff", { R: 0, G: 0, B: 0 })).toBeNull();
});

test("should return the correct contrast ratio for two hexadecimal colors", () => {
	const ratio = getContrastRatio("#000000", "#FFFFFF");
	expect(ratio).toBe(21);
});

test("clamps out-of-range CSS RGB channels before measuring", () => {
	expect(getContrastRatio("rgb(300,300,300)", "black")).toBe(21);
	expect(getContrastRatio("rgb(300,300,300)", "invalid2")).toBeNull();
});

test("should accept a Named CSS Colour as the second argument", () => {
	const ratio = getContrastRatio("#000", "white");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for CSS RGB with percentage values", () => {
	const ratio = getContrastRatio("rgb(0%, 0%, 0%)", "rgb(100%, 100%, 100%)");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for mixed percentage and integer CSS RGB values", () => {
	const ratio = getContrastRatio("rgb(255, 0%, 0)", "rgb(0%, 100%, 0%)");
	expect(ratio).toBeCloseTo(2.9139375476, 9);
});

test("should return the correct contrast ratio for RGBA with percentage values", () => {
	const ratio = getContrastRatio(
		"rgba(0%, 0%, 0%, 0.8)",
		"rgba(100%, 100%, 100%, 90%)",
	);
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio when mixing hex and percentage CSS RGB", () => {
	const ratio = getContrastRatio("#777777", "rgb(100%, 100%, 100%)");
	expect(ratio).toBeCloseTo(4.4780894536, 9);
});

test("should return the correct contrast ratio when mixing named colors and percentage CSS RGB", () => {
	const ratio = getContrastRatio("black", "rgb(100%, 100%, 100%)");
	expect(ratio).toBe(21);
});

test("should return the correct contrast ratio for decimal percentage values", () => {
	const ratio = getContrastRatio(
		"rgb(66.7%, 66.7%, 66.7%)",
		"rgb(33.3%, 33.3%, 33.3%)",
	);
	expect(ratio).toBeCloseTo(3.2165551, 7); // 66.7% = 170.085, 33.3% = 84.915, kept fractional
});

test("matches the CSS RGB contrast for fractional percentage channels", () => {
	// No hex detour: 50.2% = 128.01 must not be quantized to 128 first
	const pair = ["rgb(50.2% 50.2% 50.2%)", "rgb(10% 10% 10%)"] as const;
	expect(getContrastRatio(...pair)).toBe(getContrastRatioFromCSSRGB(...pair));
	expect(getContrastRatio(pair[0], "#1a1a1a")).not.toBe(
		getContrastRatio("#808080", "#1a1a1a"),
	);
});
