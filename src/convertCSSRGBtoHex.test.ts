import { expect, test } from "vitest";
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

test("returns null if not passing a valid CSS RGB format", () => {
	expect(convertCSSRGBtoHex("rfv(12,23,42)")).toBeNull();
});

test("rounds fractional percentage channels only when serializing to hex", () => {
	// 50.2% of 255 = 128.01, kept fractional by the parser and rounded to 0x80 here
	expect(convertCSSRGBtoHex("rgb(50.2% 0% 0%)")).toBe("#800000");
});

test("converts CSS RGB with percentage values to hexadecimal colour", () => {
	const expectedHex = "#8040ff";
	const RGB = "rgb(50%, 25%, 100%)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGBA with percentage values and decimal alpha to hexadecimal colour", () => {
	const expectedHex = "#8040ffcc";
	const RGBA = "rgba(50%, 25%, 100%, 0.8)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGBA with percentage values and percentage alpha to hexadecimal colour", () => {
	const expectedHex = "#8040ffcc";
	const RGBA = "rgba(50%, 25%, 100%, 80%)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGBA with mixed integer and percentage values to hexadecimal colour", () => {
	const expectedHex = "#8040ff80";
	const RGBA = "rgba(128, 25%, 255, 50%)";
	expect(convertCSSRGBtoHex(RGBA)).toBe(expectedHex);
});

test("converts CSS RGB with percentage and slash separator to hexadecimal colour", () => {
	const expectedHex = "#8040ffcc";
	const RGB = "rgb(50% 25% 100% / 80%)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGB with 0% values to hexadecimal colour", () => {
	const expectedHex = "#000000";
	const RGB = "rgb(0%, 0%, 0%)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});

test("converts CSS RGB with decimal percentage values to hexadecimal colour", () => {
	const expectedHex = "#8140ff";
	const RGB = "rgb(50.5%, 25.25%, 99.9%)";
	expect(convertCSSRGBtoHex(RGB)).toBe(expectedHex);
});
