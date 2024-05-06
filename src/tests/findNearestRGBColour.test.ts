import test from "ava";
import { findNearestRGBColour } from "../findNearestRGBColour";

test("should return the nearest colour from a palette", ({ deepEqual }) => {
	const palette = [
		{ R: 255, G: 255, B: 255 },
		{ R: 5, G: 5, B: 5 },
	];
	const colour = { R: 0, G: 0, B: 0 };
	deepEqual(findNearestRGBColour(colour, palette), { R: 5, G: 5, B: 5 });
});

test("should return the base colour if palette is an empty array", ({
	deepEqual,
}) => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = { R: 0, G: 0, B: 0 };
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestRGBColour(colour, palette), { R: 0, G: 0, B: 0 });
});

test("should return the base colour if palette is not provided", ({
	deepEqual,
}) => {
	const colour = { R: 0, G: 0, B: 0 };
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestRGBColour(colour, undefined), { R: 0, G: 0, B: 0 });
});
