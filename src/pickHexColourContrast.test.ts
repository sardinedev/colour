import { expect, test } from "vitest";
import { pickHexColourContrast } from "./pickHexColourContrast";

test("should return #FFFFFF as the best colour for a #333333 background", () => {
	const colours = {
		backgroundColour: "#333333",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours)).toBe("#FFFFFF");
});

test("should return #000000 as the best colour for a #BED background", () => {
	const colours = {
		backgroundColour: "#BED",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours)).toBe("#000000");
});

test("should return #000000 as the best colour for a #DD337F background", () => {
	const colours = {
		backgroundColour: "#DD337F",
		optionOneColour: "#FFFFFF",
		optionTwoColour: "#000000",
	};
	expect(pickHexColourContrast(colours)).toBe("#000000");
});

test("pickHexColourContrast: returns null for an invalid background hex value", () => {
	const colours = {
		backgroundColour: "#zzzzzz",
		optionOneColour: "#000000",
		optionTwoColour: "#ffffff",
	};
	expect(pickHexColourContrast(colours)).toBeNull();
});

test("returns optionTwoColour when both options have equal contrast against the background", () => {
	// Both options are the same colour → identical contrast ratios → tie → optionTwoColour wins
	const colours = {
		backgroundColour: "#777777",
		optionOneColour: "#ffffff",
		optionTwoColour: "#ffffff",
	};
	expect(pickHexColourContrast(colours)).toBe("#ffffff");
});
