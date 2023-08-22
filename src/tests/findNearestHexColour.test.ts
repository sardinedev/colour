import test from "ava";
import { findNearestHexColour } from "../findNearestHexColour.js";

test("should return the nearest colour from a palette", ({ deepEqual }) => {
	const palette = ["#ffffff", "#050505"];
	const colour = "#000";
	deepEqual(findNearestHexColour(colour, palette), "#050505");
});

test("should return the base colour if palette is an empty array", ({
	deepEqual,
}) => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "#000";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestHexColour(colour, palette), "#000");
});

test("should return the base colour if palette is not provided", ({
	deepEqual,
}) => {
	const colour = "#000";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	deepEqual(findNearestHexColour(colour, undefined), "#000");
});
