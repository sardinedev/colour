import { describe, expect, expectTypeOf, test } from "vitest";
import { findNearestNamedCSSColour } from "./findNearestNamedCSSColour";

test("returns the nearest palette entry", () => {
	expect(
		findNearestNamedCSSColour("pink", ["red", "hotpink", "aliceblue"]),
	).toBe("hotpink");
});

test.each([
	["cyan", ["cyan", "red"], "cyan"],
	["aqua", ["cyan", "red"], "cyan"],
	["grey", ["grey", "red"], "grey"],
	["magenta", ["lime", "magenta"], "magenta"],
] as const)("keeps aliases as given (%s)", (colour, palette, expected) => {
	expect(findNearestNamedCSSColour(colour, palette)).toBe(expected);
});

describe("edge cases", () => {
	test.each([
		["missing palette", "pink", undefined],
		["empty palette", "pink", []],
		["all entries invalid", "pink", ["rose", "Red", "#f00"]],
		["invalid target", "rose", ["red", "blue"]],
	])("returns null for %s", (_, colour, palette) => {
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestNamedCSSColour(colour, palette),
		).toBeNull();
	});

	test("returns the only valid entry", () => {
		expect(findNearestNamedCSSColour("red", ["blue"])).toBe("blue");
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestNamedCSSColour("red", ["rose", "crimson"]),
		).toBe("crimson");
	});

	test("keeps the first of equally near entries", () => {
		expect(findNearestNamedCSSColour("black", ["gray", "grey"])).toBe("gray");
		expect(findNearestNamedCSSColour("black", ["grey", "gray"])).toBe("grey");
	});
});

test("accepts readonly palettes, keeps literal types and does not mutate", () => {
	const palette = Object.freeze(["navy", "gold"] as const);
	const result = findNearestNamedCSSColour("blue", palette);
	expectTypeOf(result).toEqualTypeOf<"navy" | "gold" | null>();
	expect(result).toBe("navy");
	expect(palette).toEqual(["navy", "gold"]);
});
