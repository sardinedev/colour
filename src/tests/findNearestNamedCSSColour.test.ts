import test from "ava";
import { findNearestNamedCSSColour } from "../findNearestNamedCSSColour";
import type { NamedCSSColour } from "../types";

test("should return the nearest named CSS colour from a palette", ({
	deepEqual,
}) => {
	const palette: NamedCSSColour[] = ["hotpink", "white"];
	const colour = "pink";
	deepEqual(findNearestNamedCSSColour(colour, palette), "hotpink");
});

test("should return the base colour if palette is an empty array", ({
	deepEqual,
}) => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "pink";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestNamedCSSColour(colour, palette), "pink");
});

test("should return the base colour if palette is not provided", ({
	deepEqual,
}) => {
	const colour = "pink";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestNamedCSSColour(colour, undefined), "pink");
});

test("should return the base colour if after sanitising the colours palette has less than two options", ({
	deepEqual,
}) => {
	const colour = "pink";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette: NamedCSSColour[] = ["neve", "white"];

	deepEqual(findNearestNamedCSSColour(colour, palette), "pink");
});
