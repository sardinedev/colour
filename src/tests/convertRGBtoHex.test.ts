import { expect, test } from "vitest";
import { convertRGBtoHex } from "../convertRGBtoHex";
import type { RGBColour } from "../types";

test("converts RGB format to hexadecimal colour", () => {
	const expectedHex = "#ffffff";
	const RGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
	};
	expect(convertRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts RGBA format to hexadecimal colour with alpha channel", () => {
	const expectedHex = "#ffffff80";
	const RGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
		A: 0.5,
	};
	expect(convertRGBtoHex(RGB)).toBe(expectedHex);
});
