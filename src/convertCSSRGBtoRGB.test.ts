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
	});
});

test("convert CSS RGB separated by commas", () => {
	expect(convertCSSRGBtoRGB("rgb( 23, 111, 99)")).toStrictEqual({
		R: 23,
		G: 111,
		B: 99,
	});
});

test("convert CSS RGB with percentage values, keeping fractions", () => {
	expect(convertCSSRGBtoRGB("rgb(50%, 25%, 100%)")).toStrictEqual({
		R: 127.5, // 50% of 255
		G: 63.75, // 25% of 255
		B: 255,
	});
});

test("convert CSS RGBA with percentage values and decimal alpha", () => {
	expect(convertCSSRGBtoRGB("rgba(50%, 25%, 100%, 0.8)")).toStrictEqual({
		R: 127.5,
		G: 63.75,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGBA with percentage values and percentage alpha", () => {
	expect(convertCSSRGBtoRGB("rgba(50%, 25%, 100%, 80%)")).toStrictEqual({
		R: 127.5,
		G: 63.75,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGBA with mixed integer and percentage values", () => {
	expect(convertCSSRGBtoRGB("rgba(128, 25%, 255, 50%)")).toStrictEqual({
		R: 128,
		G: 63.75,
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
		R: 127.5,
		G: 63.75,
		B: 255,
		A: 0.8,
	});
});

test("convert CSS RGB with 0% values", () => {
	expect(convertCSSRGBtoRGB("rgb(0%, 0%, 0%)")).toStrictEqual({
		R: 0,
		G: 0,
		B: 0,
	});
});

test("clamps out-of-range channels and alpha like CSS computed values", () => {
	expect(convertCSSRGBtoRGB("rgba(-10, 300, 128, 1.5)")).toStrictEqual({
		R: 0,
		G: 255,
		B: 128,
		A: 1,
	});
	expect(convertCSSRGBtoRGB("rgb(150% -20% 50% / -0.5)")).toStrictEqual({
		R: 255,
		G: 0,
		B: 127.5,
		A: 0,
	});
	expect(convertCSSRGBtoRGB("rgba(0, 0, 0, 250%)")?.A).toBe(1);
});

test("keeps channels at the clamp boundaries unchanged", () => {
	expect(convertCSSRGBtoRGB("rgba(0, 255, 0%, 100%)")).toStrictEqual({
		R: 0,
		G: 255,
		B: 0,
		A: 1,
	});
});

test("convert CSS RGB with decimal values", () => {
	expect(convertCSSRGBtoRGB("rgb(127.5, 63.75, 255.0)")).toStrictEqual({
		R: 127.5,
		G: 63.75,
		B: 255,
	});
});

test("convert CSS RGB with decimal percentage values", () => {
	const result = convertCSSRGBtoRGB("rgb(50.5%, 25.25%, 99.9%)");
	expect(result?.R).toBeCloseTo(128.775, 10); // 50.5% of 255
	expect(result?.G).toBeCloseTo(64.3875, 10); // 25.25% of 255
	expect(result?.B).toBeCloseTo(254.745, 10); // 99.9% of 255
	expect(result).not.toHaveProperty("A");
});

test.each(["invalid", "rgb(", "not-a-color", "rgb(255,)", ""])(
	"returns null for invalid CSS RGB string %j",
	(input) => {
		expect(convertCSSRGBtoRGB(input)).toBeNull();
	},
);

test("returns null for non-string input from JavaScript callers", () => {
	// @ts-expect-error - checking runtime behaviour for JS consumers
	expect(convertCSSRGBtoRGB(undefined)).toBeNull();
	// @ts-expect-error - checking runtime behaviour for JS consumers
	expect(convertCSSRGBtoRGB({ R: 0, G: 0, B: 0 })).toBeNull();
});

test("leaves alpha out when it is omitted, meaning opaque", () => {
	const result = convertCSSRGBtoRGB("rgb(255, 128, 0)");
	expect(result).toStrictEqual({ R: 255, G: 128, B: 0 });
	expect(result).not.toHaveProperty("A");
});

test("keeps zero and one alpha", () => {
	expect(convertCSSRGBtoRGB("rgb(0 0 0 / 0)")?.A).toBe(0);
	expect(convertCSSRGBtoRGB("rgb(0 0 0 / 0%)")?.A).toBe(0);
	expect(convertCSSRGBtoRGB("rgb(0 0 0 / 1)")?.A).toBe(1);
	expect(convertCSSRGBtoRGB("rgb(0 0 0 / 100%)")?.A).toBe(1);
});

test("should handle edge case with 0% percentage value", () => {
	expect(convertCSSRGBtoRGB("rgba(0%, 50%, 100%, 0%)")).toStrictEqual({
		R: 0,
		G: 127.5,
		B: 255,
		A: 0,
	});
});

test("should handle very small decimal percentage values", () => {
	const result = convertCSSRGBtoRGB("rgba(0.1%, 0.01%, 99.99%, 0.01%)");
	expect(result?.R).toBeCloseTo(0.255, 10); // 0.1% of 255
	expect(result?.G).toBeCloseTo(0.0255, 10); // 0.01% of 255
	expect(result?.B).toBeCloseTo(254.9745, 10); // 99.99% of 255
	expect(result?.A).toBeCloseTo(0.0001, 10); // 0.01% alpha
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
	expect(convertCssValueToNumber("50%")).toBe(127.5);
	expect(convertCssValueToNumber("0%")).toBe(0);
	expect(convertCssValueToNumber("25.5%")).toBeCloseTo(65.025, 10);
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
	expect(convertCssRgbChannelValue("50%")).toBe(127.5);
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
