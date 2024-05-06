import { expect, test } from "vitest";
import { pickHexColourContrast } from "../pickHexColourContrast";

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
