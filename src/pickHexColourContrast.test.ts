import { expect, test } from "vitest";
import { pickHexColourContrast } from "./pickHexColourContrast";

test("should return #FFFFFF as the best colour for a #333333 background", () => {
	const colours = {
		backgroundColour: "#333333",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours, "WCAG2.1")).toBe("#FFFFFF");
});

test("should return #000000 as the best colour for a #BED background", () => {
	const colours = {
		backgroundColour: "#BED",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours, "WCAG2.1")).toBe("#000000");
});

test("should return #000000 as the best colour for a #DD337F background", () => {
	const colours = {
		backgroundColour: "#DD337F",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours, "WCAG2.1")).toBe("#000000");
});

test("uses WCAG3.0 standard to pick the higher contrast colour", () => {
	// WCAG3.0 luminance formula differs slightly; black should still win on a white background
	const colours = {
		backgroundColour: "#ffffff",
		optionOneColour: "#000000",
		optionTwoColour: "#888888",
	};
	expect(pickHexColourContrast(colours, "WCAG3.0")).toBe("#000000");
});

test("returns optionTwoColour when both options have equal contrast against the background", () => {
	// Both options are the same colour → identical contrast ratios → tie → optionTwoColour wins
	const colours = {
		backgroundColour: "#777777",
		optionOneColour: "#ffffff",
		optionTwoColour: "#ffffff",
	};
	expect(pickHexColourContrast(colours, "WCAG2.1")).toBe("#ffffff");
});
