import { expect, test } from "vitest";
import { convertCSSRGBtoRGB } from "../convertCSSRGBtoRGB";

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
