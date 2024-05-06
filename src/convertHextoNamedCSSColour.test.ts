import { expect, test } from "vitest";
import { convertHextoNamedCSSColour } from "./convertHextoNamedCSSColour";

test("should return the named CSS colour from a hex colour", () => {
	const colour = "#ff0000";
	expect(convertHextoNamedCSSColour(colour)).toBe("red");
});

test("should return undefined if no named CSS colour matches the given hex colour", () => {
	const colour = "#313233";
	expect(convertHextoNamedCSSColour(colour)).toBe(undefined);
});
