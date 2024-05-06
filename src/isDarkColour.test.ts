import { assert, expect, test } from "vitest";
import { isDarkColour } from "./isDarkColour";

test("should return true for `darkblue`", () => {
	expect(isDarkColour("darkblue", "WCAG2.1")).toBe(true);
});

test("should return false for `lightgoldenrodyellow`", () => {
	expect(isDarkColour("lightgoldenrodyellow", "WCAG2.1")).toBe(false);
});

test("should return true for `rgb(20, 20, 20)`", () => {
	expect(isDarkColour("rgb(20, 20, 20)", "WCAG2.1")).toBe(true);
});

test("should return false for `rgb(200, 200, 200)`", () => {
	expect(isDarkColour("rgb(200, 200, 200)", "WCAG2.1")).toBe(false);
});

test("should return false for #BED colour", () => {
	expect(isDarkColour("#BED", "WCAG2.1")).toBe(false);
});

test("should return true for #666666 colour", () => {
	expect(isDarkColour("#666666", "WCAG2.1")).toBe(true);
});

test("throws an error if not passing a valid CSS RGB format", () => {
	const rgb = "rfv(12,23,42)";
	const error = assert.throws(() =>
		isDarkColour(rgb, "WCAG2.1"),
	) as unknown as Error;
	expect(
		error.message,
		"rfv(12,23,42) is not a valid colour format. isDarkColour accepts CSS RGB formats, ie rgb(0,0,0) and rgba(255, 255, 255, 0.4), hexadecimal and CSS named colours.",
	);
});
