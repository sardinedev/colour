import { expect, test } from "vitest";
import { isHexDarkColour } from "../isHexDarkColour";

test("should return false for #BED colour", () => {
	expect(isHexDarkColour("#BED", "WCAG2.1")).toBe(false);
});

test("should return true for #666666 colour", () => {
	expect(isHexDarkColour("#666666", "WCAG2.1")).toBe(true);
});
