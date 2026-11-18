import { expect, test } from "vitest";
import { convertHextoNamedCSSColour } from "./convertHextoNamedCSSColour";

test("should return the named CSS colour from a hex colour", () => {
	const colour = "#ff0000";
	expect(convertHextoNamedCSSColour(colour)).toBe("red");
});

test("should return null if no named CSS colour matches the given hex colour", () => {
	const colour = "#313233";
	expect(convertHextoNamedCSSColour(colour)).toBeNull();
});

test("matches exactly against the lowercase 6 digit values", () => {
	expect(convertHextoNamedCSSColour("#f0f8ff")).toBe("aliceblue");
	expect(convertHextoNamedCSSColour("#F0F8FF")).toBeNull();
	expect(convertHextoNamedCSSColour("#fff")).toBeNull();
});

test("returns the first name when several names share a value", () => {
	expect(convertHextoNamedCSSColour("#00ffff")).toBe("aqua");
	expect(convertHextoNamedCSSColour("#808080")).toBe("gray");
});
