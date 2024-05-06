import test from "ava";
import { findNearestCSSRGBColour } from "../findNearestCSSRGBColour";

test("should return the nearest CSS RGB colour seperated by spaces from a palette", ({
	deepEqual,
}) => {
	const palette = ["rgb(255 255 255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	deepEqual(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour seperated by commas from a palette", ({
	deepEqual,
}) => {
	const palette = ["rgb(255,255,255)", "rgb(5,5,5)"];
	const colour = "rgb(0,0,0)";
	deepEqual(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour formats from a palette with mixed formats", ({
	deepEqual,
}) => {
	const palette = ["rgb(255,255,255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	deepEqual(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the base colour if palette is an empty array", ({
	deepEqual,
}) => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestCSSRGBColour(colour, palette), "rgb(0 0 0)");
});

test("should return the base colour if palette is not provided", ({
	deepEqual,
}) => {
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestCSSRGBColour(colour, undefined), "rgb(0 0 0)");
});
