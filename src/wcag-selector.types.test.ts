import { expect, test } from "vitest";
import { getContrastRatio } from "./getContrastRatio";
import { getContrastRatioFromCSSRGB } from "./getContrastRatioFromCSSRGB";
import { getContrastRatioFromHex } from "./getContrastRatioFromHex";
import { getContrastRatioFromNamedCSSColour } from "./getContrastRatioFromNamedCSSColour";
import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import { getSRGBLuminanceFromRGB } from "./getSRGBLuminanceFromRGB";
import { isCSSNamedDarkColour } from "./isCSSNameDarkColour";
import { isCSSRGBDarkColour } from "./isCSSRGBDarkColour";
import { isDarkColour } from "./isDarkColour";
import { isHexDarkColour } from "./isHexDarkColour";
import { pickHexColourContrast } from "./pickHexColourContrast";

test("obsolete standard selectors are rejected by TypeScript", () => {
	// @ts-expect-error The standard selector has been removed.
	expect(getContrastRatio("black", "white", "WCAG2.1")).toBe(21);
	const rgbRatio = getContrastRatioFromCSSRGB(
		"rgb(0, 0, 0)",
		"rgb(255, 255, 255)",
		// @ts-expect-error The standard selector has been removed.
		"WCAG2.1",
	);
	expect(rgbRatio).toBe(21);
	// @ts-expect-error The standard selector has been removed.
	expect(getContrastRatioFromHex("#000", "#fff", "WCAG2.1")).toBe(21);
	// @ts-expect-error The standard selector has been removed.
	expect(getContrastRatioFromNamedCSSColour("black", "white", "WCAG2.1")).toBe(
		21,
	);
	// @ts-expect-error The standard selector has been removed.
	expect(getSRGBLuminanceFromHex("#000", "WCAG2.1")).toBe(0);
	// @ts-expect-error The standard selector has been removed.
	expect(getSRGBLuminanceFromRGB({ R: 0, G: 0, B: 0 }, "WCAG2.1")).toBe(0);
	// @ts-expect-error The standard selector has been removed.
	expect(isDarkColour("black", "WCAG2.1")).toBe(true);
	// @ts-expect-error The standard selector has been removed.
	expect(isHexDarkColour("#000", "WCAG2.1")).toBe(true);
	// @ts-expect-error The standard selector has been removed.
	expect(isCSSRGBDarkColour("rgb(0, 0, 0)", "WCAG2.1")).toBe(true);
	// @ts-expect-error The standard selector has been removed.
	expect(isCSSNamedDarkColour("black", "WCAG2.1")).toBe(true);
	const colours = {
		backgroundColour: "#fff",
		optionOneColour: "#000",
		optionTwoColour: "#888",
	};
	// @ts-expect-error The standard selector has been removed.
	expect(pickHexColourContrast(colours, "WCAG2.1")).toBe("#000");
});
