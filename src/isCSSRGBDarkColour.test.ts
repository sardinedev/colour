import { expect, test } from "vitest";
import { isCSSRGBDarkColour } from "./isCSSRGBDarkColour";

test("verify if `rgb(20, 20, 20)` is a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(20, 20, 20)", "WCAG2.1")).toBe(true);
});

test("verify if `rgb(200, 200, 200)` is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(200, 200, 200)", "WCAG2.1")).toBe(false);
});
