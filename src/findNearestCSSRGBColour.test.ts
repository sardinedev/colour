import { describe, expect, expectTypeOf, test } from "vitest";
import { findNearestCSSRGBColour } from "./findNearestCSSRGBColour";

test("returns the nearest palette entry", () => {
	const palette = ["rgb(255 255 255)", "rgb(5 5 5)"];
	expect(findNearestCSSRGBColour("rgb(0 0 0)", palette)).toBe("rgb(5 5 5)");
});

test.each([
	["commas", ["rgb(255, 255, 255)", "rgb(5, 5, 5)"], "rgb(5, 5, 5)"],
	[
		"percentages",
		["rgb(100%, 100%, 100%)", "rgb(2%, 2%, 2%)"],
		"rgb(2%, 2%, 2%)",
	],
	["mixed units", ["rgb(255, 100%, 255)", "rgb(5%, 5, 5%)"], "rgb(5%, 5, 5%)"],
	[
		"alpha",
		["rgba(100%, 100%, 100%, 0.8)", "rgba(2%, 2%, 2%, 90%)"],
		"rgba(2%, 2%, 2%, 90%)",
	],
	[
		"slash syntax",
		["rgb(255 255 255 / 0.8)", "rgb(5 5 5 / 0.9)"],
		"rgb(5 5 5 / 0.9)",
	],
	["uppercase", ["RGB(255, 255, 255)", "RGB(5, 5, 5)"], "RGB(5, 5, 5)"],
	[
		"decimal percentages",
		["rgb(99.9%, 99.9%, 99.9%)", "rgb(1.96%, 1.96%, 1.96%)"],
		"rgb(1.96%, 1.96%, 1.96%)",
	],
])("returns the entry exactly as given (%s)", (_, palette, expected) => {
	expect(findNearestCSSRGBColour("rgb(0 0 0 / 0.5)", palette)).toBe(expected);
});

describe("edge cases", () => {
	test.each([
		["missing palette", "rgb(0 0 0)", undefined],
		["empty palette", "rgb(0 0 0)", []],
		["all entries invalid", "rgb(0 0 0)", ["bogus", "rgb(1, 2)"]],
		["invalid target", "nope", ["rgb(0 0 0)", "rgb(255 255 255)"]],
	])("returns null for %s", (_, colour, palette) => {
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestCSSRGBColour(colour, palette),
		).toBeNull();
	});

	test("returns the only valid entry", () => {
		expect(
			findNearestCSSRGBColour("rgb(255,0,0)", ["rgb(250,0,0)", "bogus"]),
		).toBe("rgb(250,0,0)");
		expect(findNearestCSSRGBColour("rgb(255,0,0)", ["rgb(0 0 255)"])).toBe(
			"rgb(0 0 255)",
		);
	});

	test("skips entries in other formats", () => {
		expect(
			findNearestCSSRGBColour("rgb(255 0 0)", ["#f00", "red", "rgb(0 0 255)"]),
		).toBe("rgb(0 0 255)");
	});

	test("measures clamped values but returns the entry as given", () => {
		expect(
			findNearestCSSRGBColour("rgb(255 0 0)", ["rgb(0 0 255)", "rgb(300 0 0)"]),
		).toBe("rgb(300 0 0)");
	});

	test("keeps the first of equally near entries", () => {
		expect(
			findNearestCSSRGBColour("rgb(0 0 0)", ["rgb(5 5 5)", "rgb(5, 5, 5)"]),
		).toBe("rgb(5 5 5)");
	});
});

test("accepts readonly palettes, keeps literal types and does not mutate", () => {
	const palette = Object.freeze(["rgb(255 255 255)", "rgb(0 0 0)"] as const);
	const result = findNearestCSSRGBColour("rgb(10 10 10)", palette);
	expectTypeOf(result).toEqualTypeOf<
		"rgb(255 255 255)" | "rgb(0 0 0)" | null
	>();
	expect(result).toBe("rgb(0 0 0)");
	expect(palette).toEqual(["rgb(255 255 255)", "rgb(0 0 0)"]);
});
