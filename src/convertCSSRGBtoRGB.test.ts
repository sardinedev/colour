import { expect, test } from "vitest";
import {
	convertCSSRGBtoRGB,
	convertCssAlphaChannelValue,
	convertCssRgbChannelValue,
	convertCssValueToNumber,
} from "./convertCSSRGBtoRGB";

test("convert CSS RGB separated by spaces", () => {
	expect(convertCSSRGBtoRGB("rgb( 23 111 99)")).toStrictEqual({
		R: 23,
		G: 111,
		B: 99,
		A: undefined,
	});
});

test("convert CSS RGB separated by commas", () => {
	expect(convertCSSRGBtoRGB("rgb( 23, 111, 99)")).toStrictEqual({
		R: 23,
		G: 111,
		B: 99,
		A: undefined,
	});
});

test("convert CSS RGB with percentage values", () => {
	expect(convertCSSRGBtoRGB("rgb(50%, 25%, 100%)")).toStrictEqual({
		R: 128, // 50% of 255 = 127.5, rounded to 128
		G: 64, // 25% of 255 = 63.75, rounded to 64
		B: 255, // 100% of 255 = 255
		A: undefined,
	});
});

test("convert CSS RGBA with percentage values and decimal alpha", () => {
	expect(convertCSSRGBtoRGB("rgba(50%, 25%, 100%, 0.8)")).toStrictEqual({
		R: 128,
		G: 64,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGBA with percentage values and percentage alpha", () => {
	expect(convertCSSRGBtoRGB("rgba(50%, 25%, 100%, 80%)")).toStrictEqual({
		R: 128,
		G: 64,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGBA with mixed integer and percentage values", () => {
	expect(convertCSSRGBtoRGB("rgba(128, 25%, 255, 50%)")).toStrictEqual({
		R: 128,
		G: 64,
		B: 255,
		A: 0.5,
	});
});

test("convert CSS RGB with slash separator", () => {
	expect(convertCSSRGBtoRGB("rgb(128 64 255 / 0.5)")).toStrictEqual({
		R: 128,
		G: 64,
		B: 255,
		A: 0.5,
	});
});

test("convert CSS RGB with percentage and slash separator", () => {
	expect(convertCSSRGBtoRGB("rgb(50% 25% 100% / 80%)")).toStrictEqual({
		R: 128,
		G: 64,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGB with 0% values", () => {
	expect(convertCSSRGBtoRGB("rgb(0%, 0%, 0%)")).toStrictEqual({
		R: 0,
		G: 0,
		B: 0,
		A: undefined,
	});
});

test("convert CSS RGBA with negative values", () => {
	expect(convertCSSRGBtoRGB("rgba(-10, 300, 128, 1.5)")).toStrictEqual({
		R: -10,
		G: 300,
		B: 128,
		A: 1.5, // Values outside normal ranges are preserved as-is
	});
});

test("convert CSS RGB with decimal values", () => {
	expect(convertCSSRGBtoRGB("rgb(127.5, 63.75, 255.0)")).toStrictEqual({
		R: 127.5,
		G: 63.75,
		B: 255,
		A: undefined,
	});
});

test("convert CSS RGB with decimal percentage values", () => {
	expect(convertCSSRGBtoRGB("rgb(50.5%, 25.25%, 99.9%)")).toStrictEqual({
		R: 129, // 50.5% of 255 = 128.775, rounded to 129
		G: 64, // 25.25% of 255 = 64.3875, rounded to 64
		B: 255, // 99.9% of 255 = 254.745, rounded to 255
		A: undefined,
	});
});

test("should throw error for completely invalid CSS RGB string", () => {
	expect(() => convertCSSRGBtoRGB("invalid")).toThrow(
		"convertCSSRGBtoRGB expects a valid CSS RGB string but got invalid",
	);
});

test("should throw error for incomplete CSS RGB string", () => {
	expect(() => convertCSSRGBtoRGB("rgb(")).toThrow(
		"convertCSSRGBtoRGB expects a valid CSS RGB string but got rgb(",
	);
});

test("should throw error for malformed CSS RGB string", () => {
	expect(() => convertCSSRGBtoRGB("not-a-color")).toThrow(
		"convertCSSRGBtoRGB expects a valid CSS RGB string but got not-a-color",
	);
});

test("should throw error for CSS RGB string with missing values", () => {
	expect(() => convertCSSRGBtoRGB("rgb(255,)")).toThrow(
		"convertCSSRGBtoRGB expects a valid CSS RGB string but got rgb(255,)",
	);
});

test("should throw error for empty string", () => {
	expect(() => convertCSSRGBtoRGB("")).toThrow(
		"convertCSSRGBtoRGB expects a valid CSS RGB string but got ",
	);
});

test("should handle RGB without alpha (undefined alpha channel)", () => {
	// This specifically tests the undefined branch in convertCssAlphaChannelValue
	const result = convertCSSRGBtoRGB("rgb(255, 128, 0)");
	expect(result).toStrictEqual({
		R: 255,
		G: 128,
		B: 0,
		A: undefined,
	});

	// Verify A is explicitly undefined, not just missing
	expect(result.A).toBe(undefined);
	expect("A" in result).toBe(true);
});

test("should handle edge case with 0% percentage value", () => {
	// This tests potential edge cases in the percentage conversion logic
	const result = convertCSSRGBtoRGB("rgba(0%, 50%, 100%, 0%)");
	expect(result).toStrictEqual({
		R: 0, // 0% of 255 = 0
		G: 128, // 50% of 255 = 127.5, rounded to 128
		B: 255, // 100% of 255 = 255
		A: 0, // 0% alpha = 0
	});
});

test("should handle very small decimal percentage values", () => {
	// This tests potential edge cases in decimal percentage conversion
	const result = convertCSSRGBtoRGB("rgba(0.1%, 0.01%, 99.99%, 0.01%)");
	expect(result).toStrictEqual({
		R: 0, // 0.1% of 255 = 0.255, rounded to 0
		G: 0, // 0.01% of 255 = 0.0255, rounded to 0
		B: 255, // 99.99% of 255 = 254.9745, rounded to 255
		A: 0.0001, // 0.01% alpha = 0.0001
	});
});

// Direct tests for exported helper functions
test("convertCssValueToNumber - should parse regular numbers", () => {
	expect(convertCssValueToNumber("255")).toBe(255);
	expect(convertCssValueToNumber("0")).toBe(0);
	expect(convertCssValueToNumber("127.5")).toBe(127.5);
	expect(convertCssValueToNumber("-10")).toBe(-10);
});

test("convertCssValueToNumber - should parse RGB percentages", () => {
	expect(convertCssValueToNumber("100%")).toBe(255);
	expect(convertCssValueToNumber("50%")).toBe(128);
	expect(convertCssValueToNumber("0%")).toBe(0);
	expect(convertCssValueToNumber("25.5%")).toBe(65);
});

test("convertCssValueToNumber - should parse alpha percentages", () => {
	expect(convertCssValueToNumber("100%", true)).toBe(1);
	expect(convertCssValueToNumber("50%", true)).toBe(0.5);
	expect(convertCssValueToNumber("0%", true)).toBe(0);
	expect(convertCssValueToNumber("75%", true)).toBe(0.75);
});

test("convertCssValueToNumber - should parse alpha decimals", () => {
	expect(convertCssValueToNumber("1.0", true)).toBe(1.0);
	expect(convertCssValueToNumber("0.5", true)).toBe(0.5);
	expect(convertCssValueToNumber("0", true)).toBe(0);
});

test("convertCssRgbChannelValue - should handle defined values", () => {
	expect(convertCssRgbChannelValue("255")).toBe(255);
	expect(convertCssRgbChannelValue("50%")).toBe(128);
});

test("convertCssRgbChannelValue - should handle undefined values", () => {
	expect(convertCssRgbChannelValue(undefined)).toBe(undefined);
	expect(convertCssRgbChannelValue("")).toBe(undefined);
});

test("convertCssAlphaChannelValue - should handle defined values", () => {
	expect(convertCssAlphaChannelValue("0.5")).toBe(0.5);
	expect(convertCssAlphaChannelValue("50%")).toBe(0.5);
});

test("convertCssAlphaChannelValue - should handle undefined values", () => {
	expect(convertCssAlphaChannelValue(undefined)).toBe(undefined);
	expect(convertCssAlphaChannelValue("")).toBe(undefined);
});
