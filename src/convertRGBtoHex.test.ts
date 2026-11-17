import { expect, test } from "vitest";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";
import type { RGBColour } from "./types";

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

test.each([
	[{ R: 255, G: 0, B: 0, A: 0 }, "#ff000000"],
	[{ R: 255, G: 0, B: 0, A: 1 }, "#ff0000ff"],
	[{ R: 127.5, G: 0, B: 0 }, "#800000"],
	[{ R: -10, G: 127.5, B: 300 }, "#0080ff"],
	[{ R: 0, G: 255, B: 127.5, A: 1.5 }, "#00ff80ff"],
	[{ R: 0, G: 255, B: 0, A: -0.5 }, "#00ff0000"],
])("serializes %o as valid clamped hex", (colour, expected) => {
	expect(convertRGBtoHex(colour)).toBe(expected);
});

test("rounds fractional RGB channels to bytes that roundtrip", () => {
	const hex = convertRGBtoHex({ R: 127.5, G: 0.5, B: 255.4 });
	expect(hex).toMatch(/^#[\da-f]{6}$/i);
	expect(convertHextoRGB(hex)).toStrictEqual({ R: 128, G: 1, B: 255 });
});
