import { expect, test } from "vitest";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";

test("returns 0 for black", () => {
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 0 })).toBe(0);
});

test("returns 1 for white", () => {
	expect(getSRGBLuminanceFromRGB({ R: 255, G: 255, B: 255 })).toBe(1);
});

test("pure red has the luminance contribution from the red channel only", () => {
	// luminance = 0.2126 * linearRGB(255) = 0.2126
	expect(getSRGBLuminanceFromRGB({ R: 255, G: 0, B: 0 })).toBeCloseTo(
		0.2126,
		4,
	);
});

test("pure green has the luminance contribution from the green channel only", () => {
	// luminance = 0.7152 * linearRGB(255) = 0.7152
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 255, B: 0 })).toBeCloseTo(
		0.7152,
		4,
	);
});

test("pure blue has the luminance contribution from the blue channel only", () => {
	// luminance = 0.0722 * linearRGB(255) = 0.0722
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 255 })).toBeCloseTo(
		0.0722,
		4,
	);
});

test("luminance is between 0 and 1 for any valid RGB colour", () => {
	const luminance = getSRGBLuminanceFromRGB({ R: 128, G: 64, B: 200 });
	expect(luminance).toBeGreaterThanOrEqual(0);
	expect(luminance).toBeLessThanOrEqual(1);
});

test.each([
	[10.2, 0.04 / 12.92],
	[0.04045 * 255, 0.04045 / 12.92],
	[0.04046 * 255, ((0.04046 + 0.055) / 1.055) ** 2.4],
])(
	"uses the sRGB transfer function for fractional channel value %s",
	(R, value) => {
		expect(getSRGBLuminanceFromRGB({ R, G: 0, B: 0 })).toBeCloseTo(
			0.2126 * value,
			12,
		);
	},
);
