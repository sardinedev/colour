import test from "ava";
import { convertCSSRGBtoRGB } from "../convertCSSRGBtoRGB.js";

test("convert CSS RGB separated by spaces", ({ deepEqual }) => {
	deepEqual(convertCSSRGBtoRGB("rgb( 23, 111, 99)"), {
		R: 23,
		G: 111,
		B: 99,
		A: undefined,
	});
});
