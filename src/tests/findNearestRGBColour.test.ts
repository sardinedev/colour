import { expect, test } from "vitest";
import { findNearestRGBColour } from "../findNearestRGBColour";

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
