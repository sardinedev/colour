import { expect, test } from "vitest";
import { findNearestHexColour } from "../findNearestHexColour";

test("should return the nearest colour from a palette", () => {
	const palette = ["#ffffff", "#050505"];
	const colour = "#000";
	expect(findNearestHexColour(colour, palette), "#050505");
});

test("should return the base colour if palette is an empty array", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "#000";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestHexColour(colour, palette), "#000");
});

test("should return the base colour if palette is not provided", () => {
	const colour = "#000";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestHexColour(colour, undefined), "#000");
});
