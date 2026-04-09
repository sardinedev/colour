import { expect, test } from "vitest";
import { convertHextoRGB } from "./convertHextoRGB";
import type { RGBColour } from "./types";

test("converts a 6 digit hexadecimal colour string to RGB format", () => {
	const hex = "#ffffff";
	const expectedRGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
	};
	expect(convertHextoRGB(hex)).toStrictEqual(expectedRGB);
});

test("converts a 3 digit hexadecimal colour string to RGB format", () => {
	const hex = "#fff";
	const expectedRGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
	};
	expect(convertHextoRGB(hex)).toStrictEqual(expectedRGB);
});

test("converts a 8 digit hexadecimal (RGB + Alpha) colour string to RGBA format", () => {
	const hex = "#ffffffff";
	const expectedRGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
		A: 1,
	};
	expect(convertHextoRGB(hex)).toStrictEqual(expectedRGB);
});

test("converts a 4 digit hexadecimal (RGB + Alpha) colour string to RGBA format", () => {
	const hex = "#ffff";
	const expectedRGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
		A: 1,
	};
	expect(convertHextoRGB(hex)).toStrictEqual(expectedRGB);
});

test("returns null if not passed a string", () => {
	const hex = 235434;
	// @ts-expect-error: Passing wrong type for test only
	expect(convertHextoRGB(hex)).toBeNull();
});

test("returns null if not passed a valid hexadecimal value", () => {
	const hex = "HH77ZZs";
	expect(convertHextoRGB(hex)).toBeNull();
});
