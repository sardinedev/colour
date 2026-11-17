import { expect, test } from "vitest";
import { isHexDarkColour } from "./isHexDarkColour";

test("should return false for #BED colour", () => {
	expect(isHexDarkColour("#BED")).toBe(false);
});

test("should return true for #666666 colour", () => {
	expect(isHexDarkColour("#666666")).toBe(true);
});

test("isHexDarkColour: 8-digit hex with zero alpha on a dark colour is still dark (alpha ignored)", () => {
	// Alpha channel is not part of luminance calculation — only RGB channels matter
	expect(isHexDarkColour("#00000000")).toBe(true);
});

test("isHexDarkColour: 8-digit hex with zero alpha on a light colour is still light (alpha ignored)", () => {
	expect(isHexDarkColour("#ffffff00")).toBe(false);
});

test("isHexDarkColour: returns false for malformed hex colour", () => {
	expect(isHexDarkColour("transparent")).toBe(false);
});

test("isHexDarkColour: returns false for invalid hex colour", () => {
	expect(isHexDarkColour("#HHHHII")).toBe(false);
});
