import { expect, test } from "vitest";
import { RGBdistance } from "./RGBdistance";
import type { RGBColour } from "./types";

test("returns 0 for identical colours", () => {
	const colour: RGBColour = { R: 128, G: 64, B: 255 };
	expect(RGBdistance(colour, colour)).toBe(0);
});

test("returns 0 for two identical black colours", () => {
	expect(RGBdistance({ R: 0, G: 0, B: 0 }, { R: 0, G: 0, B: 0 })).toBe(0);
});

test("returns a positive distance for different colours", () => {
	const black: RGBColour = { R: 0, G: 0, B: 0 };
	const white: RGBColour = { R: 255, G: 255, B: 255 };
	expect(RGBdistance(black, white)).toBeGreaterThan(0);
});

test("distance grows as colours become more different", () => {
	const base: RGBColour = { R: 0, G: 0, B: 0 };
	const slightlyDifferent: RGBColour = { R: 10, G: 10, B: 10 };
	const veryDifferent: RGBColour = { R: 255, G: 255, B: 255 };
	expect(RGBdistance(base, slightlyDifferent)).toBeLessThan(
		RGBdistance(base, veryDifferent),
	);
});

test("is symmetric — distance(a, b) equals distance(b, a)", () => {
	const red: RGBColour = { R: 255, G: 0, B: 0 };
	const blue: RGBColour = { R: 0, G: 0, B: 255 };
	expect(RGBdistance(red, blue)).toBe(RGBdistance(blue, red));
});

test("returns a distance within the typical CIEDE2000 range for visible colours", () => {
	const black: RGBColour = { R: 0, G: 0, B: 0 };
	const white: RGBColour = { R: 255, G: 255, B: 255 };
	const distance = RGBdistance(black, white);
	expect(distance).toBeGreaterThan(0);
	// CIEDE2000 max is 100; allow a tiny floating-point overshoot
	expect(distance).toBeCloseTo(100, 0);
});
