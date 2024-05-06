import { expect, test } from "vitest";
import { convertRGBtoXYZ } from "../convertRGBtoXYZ";
import type { RGBColour, XYZColour } from "../types";

test("convert RGB to XYZ", () => {
	const RGB: RGBColour = { R: 34, G: 250, B: 124 };
	const expectedXYZ: XYZColour = {
		X: 38.483384631576946,
		Y: 70.16653157373521,
		Z: 30.583997140084364,
	};
	expect(convertRGBtoXYZ(RGB)).toStrictEqual(expectedXYZ);
});

test("convert RGB to XYZ with reverse transformation", () => {
	const RGB: RGBColour = { R: 0, G: 250, B: 124 };
	const expectedXYZ: XYZColour = {
		X: 37.82369749318333,
		Y: 69.82645037678448,
		Z: 30.553124293888928,
	};
	expect(convertRGBtoXYZ(RGB)).toStrictEqual(expectedXYZ);
});
