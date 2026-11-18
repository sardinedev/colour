import { expect, test } from "vitest";
import { isDarkColour } from "./isDarkColour";

test("should return true for `darkblue`", () => {
	expect(isDarkColour("darkblue")).toBe(true);
});

test("should return false for `lightgoldenrodyellow`", () => {
	expect(isDarkColour("lightgoldenrodyellow")).toBe(false);
});

test("should return true for `rgb(20, 20, 20)`", () => {
	expect(isDarkColour("rgb(20, 20, 20)")).toBe(true);
});

test("should return false for `rgb(200, 200, 200)`", () => {
	expect(isDarkColour("rgb(200, 200, 200)")).toBe(false);
});

test("should return false for #BED colour", () => {
	expect(isDarkColour("#BED")).toBe(false);
});

test("should return true for #666666 colour", () => {
	expect(isDarkColour("#666666")).toBe(true);
});

test.each(["rfv(12,23,42)", "rgb(12,23)", "#12345", "not-a-colour", ""])(
	"returns false for invalid colour %j",
	(colour) => {
		expect(isDarkColour(colour)).toBe(false);
	},
);

test("returns false for non-string input from JavaScript callers", () => {
	// @ts-expect-error - checking runtime behaviour for JS consumers
	expect(isDarkColour(null)).toBe(false);
	// @ts-expect-error - checking runtime behaviour for JS consumers
	expect(isDarkColour({ R: 0, G: 0, B: 0 })).toBe(false);
});

test("should return true for CSS RGB with percentage values (dark)", () => {
	expect(isDarkColour("rgb(8%, 8%, 8%)")).toBe(true);
});

test("should return false for CSS RGB with percentage values (light)", () => {
	expect(isDarkColour("rgb(78%, 78%, 78%)")).toBe(false);
});

test("should return true for CSS RGBA with percentage values", () => {
	expect(isDarkColour("rgba(8%, 8%, 8%, 0.9)")).toBe(true);
});

test("should return true for CSS RGB with mixed percentage and integer values", () => {
	expect(isDarkColour("rgb(20, 8%, 20)")).toBe(true);
});

test("isDarkColour: fully transparent dark RGBA is still considered dark (alpha ignored)", () => {
	// Alpha channel is not part of luminance calculation — only RGB channels matter
	expect(isDarkColour("rgba(0, 0, 0, 0)")).toBe(true);
});

test("isDarkColour: fully transparent light RGBA is still considered light (alpha ignored)", () => {
	expect(isDarkColour("rgba(255, 255, 255, 0)")).toBe(false);
});

test("isDarkColour: 8-digit hex with zero alpha on a dark colour is still dark (alpha ignored)", () => {
	expect(isDarkColour("#00000000")).toBe(true);
});

test("isDarkColour: 8-digit hex with zero alpha on a light colour is still light (alpha ignored)", () => {
	expect(isDarkColour("#ffffff00")).toBe(false);
});
