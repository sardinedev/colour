import { assert, expect, test } from "vitest";
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

test("throws an error if not passing a string", () => {
	const hex = 235434;
	// @ts-ignore: Passing wrong type for test only
	const error = assert.throws(() => convertHextoRGB(hex)) as Error;
	expect(error.message).toBe(
		"convertHextoRGB expects a string but got a number",
	);
});

test("throws an error if not passing a valid hexadecimal value", () => {
	const hex = "HH77ZZs";
	const error = assert.throws(() => convertHextoRGB(hex)) as unknown as Error;
	expect(
		error.message,
		"convertHextoRGB expects an valid hexadecimal colour value but got HH77ZZs",
	);
});
