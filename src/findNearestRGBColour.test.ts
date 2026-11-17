import { expect, test, vi } from "vitest";
import * as convertRGBtoLabModule from "./convertRGBtoLab";
import { findNearestRGBColour } from "./findNearestRGBColour";
import { RGBdistance } from "./RGBdistance";
import type { RGBColour } from "./types";

test("should return the nearest colour from a palette", () => {
	const palette = [
		{ R: 255, G: 255, B: 255 },
		{ R: 5, G: 5, B: 5 },
	];
	const colour = { R: 0, G: 0, B: 0 };
	expect(findNearestRGBColour(colour, palette)).toStrictEqual({
		R: 5,
		G: 5,
		B: 5,
	});
});

test("converts the target to Lab once and keeps the first equally near colour", () => {
	const colour = { R: 0, G: 0, B: 0 };
	const first = { R: 5, G: 5, B: 5 };
	const second = { R: 5, G: 5, B: 5 };
	const convertSpy = vi.spyOn(convertRGBtoLabModule, "convertRGBtoLab");

	expect(findNearestRGBColour(colour, [first, second])).toBe(first);
	expect(
		convertSpy.mock.calls.filter(([candidate]) => candidate === colour),
	).toHaveLength(1);
	expect(convertSpy).toHaveBeenCalledTimes(3);

	convertSpy.mockRestore();
});

test("matches RGBdistance selection for fractional, alpha, and invalid channels", () => {
	const cases: [RGBColour, RGBColour[]][] = [
		[
			{ R: 31.5, G: 63.25, B: 201.75, A: 0.25 },
			[
				{ R: 31.50001, G: 63.25, B: 201.75, A: 1 },
				{ R: 31.5, G: 63.25001, B: 201.75, A: 0 },
				{ R: 32, G: 64, B: 202, A: 0.5 },
			],
		],
		[
			{ R: Number.NaN, G: 0, B: 0 },
			[
				{ R: 0, G: 0, B: 0 },
				{ R: 255, G: 255, B: 255 },
			],
		],
	];

	for (const [colour, palette] of cases) {
		let expected = colour;
		let minDistance = Number.POSITIVE_INFINITY;
		for (const paletteColour of palette) {
			const distance = RGBdistance(colour, paletteColour);
			if (distance < minDistance) {
				minDistance = distance;
				expected = paletteColour;
			}
		}
		expect(findNearestRGBColour(colour, palette)).toBe(expected);
	}
});

test("should return the base colour if palette is an empty array", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = { R: 0, G: 0, B: 0 };
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestRGBColour(colour, palette)).toStrictEqual({
		R: 0,
		G: 0,
		B: 0,
	});
});

test("should return the base colour if palette is not provided", () => {
	const colour = { R: 0, G: 0, B: 0 };
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestRGBColour(colour, undefined)).toStrictEqual({
		R: 0,
		G: 0,
		B: 0,
	});
});
