import { expect, test } from "vitest";
import { convertHextoCSSRGB } from "./convertHextoCSSRGB";

test("converts a 6 digit hexadecimal colour string to CSSRGB format", () => {
	const hex = "#ffffff";
	const expectedRGB = "rgb(255,255,255)";
	expect(convertHextoCSSRGB(hex)).toBe(expectedRGB);
});

test("converts a 3 digit hexadecimal colour string to CSSRGB format", () => {
	const hex = "#fff";
	const expectedRGB = "rgb(255,255,255)";
	expect(convertHextoCSSRGB(hex)).toBe(expectedRGB);
});

test("converts a 8 digit hexadecimal (RGB + Alpha) colour string to CSSRGBA format", () => {
	const hex = "#ffffffff";
	const expectedRGB = "rgba(255,255,255,1)";
	expect(convertHextoCSSRGB(hex)).toBe(expectedRGB);
});

test("converts a 8 digit hexadecimal (RGB + 50% Alpha) colour string to CSSRGBA format", () => {
	const hex = "#7b2d596e";
	const expectedRGB = "rgba(123,45,89,0.43)";
	expect(convertHextoCSSRGB(hex)).toBe(expectedRGB);
});

test("converts a 4 digit hexadecimal (RGB + Alpha) colour string to CSSRGBA format", () => {
	const hex = "#ffff";
	const expectedRGB = "rgba(255,255,255,1)";
	expect(convertHextoCSSRGB(hex)).toBe(expectedRGB);
});
