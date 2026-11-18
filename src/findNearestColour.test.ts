import { describe, expect, expectTypeOf, test } from "vitest";
import { findNearestColour } from "./findNearestColour";

test("returns the nearest palette entry", () => {
	expect(findNearestColour("#000", ["#ffffff", "#050505"])).toBe("#050505");
	expect(findNearestColour("pink", ["red", "hotpink", "aliceblue"])).toBe(
		"hotpink",
	);
});

test.each([
	["hex target, named entries", "#f00", ["red", "blue"], "red"],
	["named target, hex entries", "red", ["#fa0000", "#00f"], "#fa0000"],
	["CSS target, mixed entries", "rgb(255,0,0)", ["#fa0000", "blue"], "#fa0000"],
	[
		"CSS target, CSS entry",
		"rgb(0 0 0)",
		["#fff", "rgb(5, 5, 5)", "white"],
		"rgb(5, 5, 5)",
	],
	["hex alpha entry", "rgb(0 0 0)", ["#00000080", "#ffffff"], "#00000080"],
	["alias", "cyan", ["cyan", "red"], "cyan"],
])(
	"returns the entry in its own format (%s)",
	(_, colour, palette, expected) => {
		expect(findNearestColour(colour, palette)).toBe(expected);
	},
);

describe("edge cases", () => {
	test.each([
		["missing palette", "#000", undefined],
		["empty palette", "#000", []],
		["all entries invalid", "#000", ["bogus", "rgb(1, 2)", "Red"]],
		["invalid target", "nope", ["#000", "#fff"]],
		["invalid target, empty palette", "nope", []],
		["RGB object target", { R: 0, G: 0, B: 0 }, ["#000", "#fff"]],
	])("returns null for %s", (_, colour, palette) => {
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestColour(colour, palette),
		).toBeNull();
	});

	test("returns the only valid entry", () => {
		expect(findNearestColour("pink", ["bogus", "navy"])).toBe("navy");
	});

	test("skips non-string entries", () => {
		const palette = [{ R: 0, G: 0, B: 0 }, "white"];
		// @ts-expect-error - checking runtime behaviour for JS consumers
		expect(findNearestColour("#000", palette)).toBe("white");
	});

	test("keeps the first of equally near entries across formats", () => {
		expect(findNearestColour("#000", ["#111", "rgb(17 17 17)"])).toBe("#111");
		expect(findNearestColour("#000", ["rgb(17 17 17)", "#111"])).toBe(
			"rgb(17 17 17)",
		);
	});
});

test("always returns a member of the palette", () => {
	const palette = [
		"#FFF",
		"rgb(0, 0, 0)",
		"hotpink",
		"rgb(50% 75% 0% / 0.5)",
		"#c0ffee",
		"navy",
	];
	for (let v = 0; v < 256; v += 15) {
		const colour = `rgb(${v} ${255 - v} 128)`;
		expect(palette).toContain(findNearestColour(colour, palette));
	}
});

test("accepts readonly palettes, keeps literal types and does not mutate", () => {
	const palette = Object.freeze(["#fff", "black"] as const);
	const result = findNearestColour("rgb(10 10 10)", palette);
	expectTypeOf(result).toEqualTypeOf<"#fff" | "black" | null>();
	expect(result).toBe("black");
	expect(palette).toEqual(["#fff", "black"]);
});
