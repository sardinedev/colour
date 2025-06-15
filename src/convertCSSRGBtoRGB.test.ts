import { expect, test } from "vitest";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";

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
