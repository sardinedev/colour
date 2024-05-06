import { expect, test } from "vitest";
import { findNearestColour } from "./findNearestColour";

test("should return the nearest colour from a palette", () => {
	const palette = ["#ffffff", "#050505"];
	const colour = "#000";
	expect(findNearestColour(colour, palette), "#050505");
});

test("should return the nearest CSS RGB colour seperated by spaces from a palette", () => {
	const palette = ["rgb(255 255 255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	expect(findNearestColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour seperated by commas from a palette", () => {
	const palette = ["rgb(255,255,255)", "rgb(5,5,5)"];
	const colour = "rgb(0,0,0)";
	expect(findNearestColour(colour, palette), "rgb(5 5 5)");
});

test("should return the nearest CSS RGB colour formats from a palette with mixed formats", () => {
	const palette = ["rgb(255,255,255)", "rgb(5 5 5)"];
	const colour = "rgb(0 0 0)";
	expect(findNearestColour(colour, palette), "rgb(5 5 5)");
});

test("should return the base colour if palette is an empty array", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	const palette = [];
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestColour(colour, palette), "rgb(0 0 0)");
});

test("should return the base colour if palette is not provided", () => {
	const colour = "rgb(0 0 0)";
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(findNearestColour(colour, undefined), "rgb(0 0 0)");
});

test("should return the nearest named CSS colour from a palette", () => {
	const palette = ["hotpink", "white"];
	const colour = "pink";
	expect(findNearestColour(colour, palette), "hotpink");
});

test("should return the base colour if palette is an empty array after sanitising colours", () => {
	const palette = ["neve", "hotsauce", "sun"];
	const colour = "pink";
	expect(findNearestColour(colour, palette), "pink");
});

test("should return nearest colour from a palette with mixed formats", () => {
	const palette = ["hotpink", "rgb(5 5 5)", "#ffffff"];
	const colour = "pink";
	expect(findNearestColour(colour, palette), "hotpink");
});

test("should return undefined if base colour is not valid", () => {
	const palette = ["hotpink", "rgb(5 5 5)", "#ffffff"];
	const colour = "pinkk";
	expect(findNearestColour(colour, palette), undefined);
});
