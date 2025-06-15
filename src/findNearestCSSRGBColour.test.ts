import { expect, test } from "vitest";
import { findNearestCSSRGBColour } from "./findNearestCSSRGBColour";

test("should return the nearest CSS RGB colour seperated by spaces from a palette", () => {
	const palette = ["rgb(255 255 255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour seperated by commas from a palette", () => {
	const palette = ["rgb(255,255,255)", "rgb(5,5,5)"];
	const colour = "rgb(0,0,0)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour formats from a palette with mixed formats", () => {
	const palette = ["rgb(255,255,255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should return the base colour if palette is an empty array", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestCSSRGBColour(colour, palette), "rgb(0 0 0)");
});

test("should return the base colour if palette is not provided", () => {
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestCSSRGBColour(colour, undefined), "rgb(0 0 0)");
});

test("should find nearest CSS RGB colour with percentage values", () => {
	const palette = ["rgb(100%, 100%, 100%)", "rgb(2%, 2%, 2%)"];
	const colour = "rgb(0%, 0%, 0%)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should find nearest CSS RGB colour with mixed percentage and integer values", () => {
	const palette = ["rgb(255, 100%, 255)", "rgb(5%, 5, 5%)"];
	const colour = "rgb(0, 0%, 0)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(13 5 13)");
});

test("should find nearest CSS RGB colour with RGBA percentage values", () => {
	const palette = ["rgba(100%, 100%, 100%, 0.8)", "rgba(2%, 2%, 2%, 90%)"];
	const colour = "rgba(0%, 0%, 0%, 0.5)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should find nearest CSS RGB colour with modern slash syntax", () => {
	const palette = ["rgb(255 255 255 / 0.8)", "rgb(5 5 5 / 0.9)"];
	const colour = "rgb(0 0 0 / 0.5)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});

test("should find nearest CSS RGB colour with decimal percentage values", () => {
	const palette = ["rgb(99.9%, 99.9%, 99.9%)", "rgb(1.96%, 1.96%, 1.96%)"];
	const colour = "rgb(0.39%, 0.39%, 0.39%)";
	expect(findNearestCSSRGBColour(colour, palette), "rgb(5 5 5)");
});
