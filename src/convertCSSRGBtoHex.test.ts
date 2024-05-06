import { assert, expect, test } from "vitest";
import { convertCSSRGBtoHex } from "./convertCSSRGBtoHex";

test("converts CSS RGB format to hexadecimal colour", () => {
	const expectedHex = "#ffffff";
	const RGB = "rgb(255,255,255)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGBA format to hexadecimal colour with alpha channel", () => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255,255,255,0.5)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGBA format to hexadecimal colour with short alpha channel", () => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255,255,255,.5)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGB format to hexadecimal colour but clamps max channel value at 255", () => {
	const expectedHex = "#ffffff";
	const RGBA = "rgba(300,500,900)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGB format to hexadecimal colour but clamps min channel value at 0", () => {
	const expectedHex = "#000000";
	const RGB = "rgb(-300,-500,-900)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGB with space separated values to hexadecimal colour", () => {
	const expectedHex = "#ffffff";
	const RGB = "rgb(255 255 255)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGBA with space separated values and forward slash for the alpha channel to hexadecimal colour", () => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255 255 255 / 0.5)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("throws an error if not passing a valid CSS RGB format", () => {
	const rgb = "rfv(12,23,42)";
	const error = assert.throws(() =>
		convertCSSRGBtoHex(rgb),
	) as unknown as Error;
	expect(
		error.message,
		"convertCSSRGBtoHex expects a valid CSS RGB string but got rfv(12,23,42)",
	);
});
