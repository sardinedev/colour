import test from "ava";
import { convertRGBtoXYZ } from "../convertRGBtoXYZ.js";
import type { RGBColour, XYZColour } from "../types";

test("convert RGB to XYZ", ({ deepEqual }) => {
	const RGB: RGBColour = { R: 34, G: 250, B: 124 };
	const expectedXYZ: XYZColour = {
		X: 38.483384631576946,
		Y: 70.16653157373521,
		Z: 30.583997140084364,
	};
	deepEqual(convertRGBtoXYZ(RGB), expectedXYZ);
});

test("convert RGB to XYZ with reverse transformation", ({ deepEqual }) => {
	const RGB: RGBColour = { R: 0, G: 250, B: 124 };
	const expectedXYZ: XYZColour = {
		X: 37.82369749318333,
		Y: 69.82645037678448,
		Z: 30.553124293888928,
	};
	deepEqual(convertRGBtoXYZ(RGB), expectedXYZ);
});
