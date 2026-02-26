import { expect, test } from "vitest";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";

test("returns 0 for black under WCAG2.1", () => {
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 0 }, "WCAG2.1")).toBe(0);
});

test("returns 1 for white under WCAG2.1", () => {
	expect(getSRGBLuminanceFromRGB({ R: 255, G: 255, B: 255 }, "WCAG2.1")).toBe(
		1,
	);
});

test("returns 0 for black under WCAG3.0", () => {
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 0 }, "WCAG3.0")).toBe(0);
});

test("returns 1 for white under WCAG3.0", () => {
	expect(getSRGBLuminanceFromRGB({ R: 255, G: 255, B: 255 }, "WCAG3.0")).toBe(
		1,
	);
});

test("pure red has the luminance contribution from the red channel only (WCAG2.1)", () => {
	// luminance = 0.2126 * linearRGB(255) = 0.2126
	expect(
		getSRGBLuminanceFromRGB({ R: 255, G: 0, B: 0 }, "WCAG2.1"),
	).toBeCloseTo(0.2126, 4);
});

test("pure green has the luminance contribution from the green channel only (WCAG2.1)", () => {
	// luminance = 0.7152 * linearRGB(255) = 0.7152
	expect(
		getSRGBLuminanceFromRGB({ R: 0, G: 255, B: 0 }, "WCAG2.1"),
	).toBeCloseTo(0.7152, 4);
});

test("pure blue has the luminance contribution from the blue channel only (WCAG2.1)", () => {
	// luminance = 0.0722 * linearRGB(255) = 0.0722
	expect(
		getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 255 }, "WCAG2.1"),
	).toBeCloseTo(0.0722, 4);
});

test("luminance is between 0 and 1 for any valid RGB colour", () => {
	const luminance = getSRGBLuminanceFromRGB(
		{ R: 128, G: 64, B: 200 },
		"WCAG2.1",
	);
	expect(luminance).toBeGreaterThanOrEqual(0);
	expect(luminance).toBeLessThanOrEqual(1);
});

test("returns the same result without a standard argument", () => {
	const withStandard = getSRGBLuminanceFromRGB(
		{ R: 100, G: 150, B: 200 },
		undefined,
	);
	const withoutStandard = getSRGBLuminanceFromRGB({ R: 100, G: 150, B: 200 });
	expect(withStandard).toBe(withoutStandard);
});
