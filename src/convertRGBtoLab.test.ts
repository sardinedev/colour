import { expect, test } from "vitest";
import { convertRGBtoLab } from "./convertRGBtoLab";
import type { LabColour, RGBColour } from "./types";

test("converts RGB to Lab", () => {
	const RGB: RGBColour = { R: 34, G: 250, B: 124 };
	const expectedLab: LabColour = {
		L: 87.07847680208145,
		a: -74.4060883781999,
		b: 46.74058735821831,
	};
	expect(convertRGBtoLab(RGB)).toStrictEqual(expectedLab);
});
