import { describe, expect, expectTypeOf, test } from "vitest";
import { findNearestHexColour } from "./findNearestHexColour";

test("returns the nearest palette entry", () => {
	expect(findNearestHexColour("#000", ["#ffffff", "#050505"])).toBe("#050505");
});

test("returns the entry exactly as given", () => {
	expect(findNearestHexColour("#f00", ["#FA0000", "#000"])).toBe("#FA0000");
	expect(findNearestHexColour("#ff0000", ["#f00", "#000"])).toBe("#f00");
	expect(findNearestHexColour("#f00", ["#ff000080", "#000"])).toBe("#ff000080");
});

describe("edge cases", () => {
	test.each([
		["missing palette", "#f00", undefined],
		["empty palette", "#f00", []],
		["all entries invalid", "#f00", ["bogus", "#12345"]],
		["invalid target", "nope", ["#000", "#fff"]],
		["invalid target, empty palette", "nope", []],
	])("returns null for %s", (_, colour, palette) => {
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestHexColour(colour, palette),
		).toBeNull();
	});

	test("returns the only valid entry", () => {
		expect(findNearestHexColour("#f00", ["#00f"])).toBe("#00f");
		expect(findNearestHexColour("#f00", ["bogus", "#00f", "x"])).toBe("#00f");
	});

	test("skips entries in other formats", () => {
		expect(
			findNearestHexColour("#f00", ["red", "rgb(255, 0, 0)", "#0000ff"]),
		).toBe("#0000ff");
	});

	test("keeps the first of equally near entries, including duplicates", () => {
		expect(findNearestHexColour("#000", ["#111", "#111111"])).toBe("#111");
		expect(findNearestHexColour("#000", ["#222", "#111", "#111"])).toBe("#111");
	});

	test("ignores alpha on both sides", () => {
		expect(findNearestHexColour("#ff000000", ["#00ff00", "#ff0000"])).toBe(
			"#ff0000",
		);
		expect(findNearestHexColour("#ff0000", ["#00ff00", "#fa000000"])).toBe(
			"#fa000000",
		);
	});
});

test("always returns a member of the palette", () => {
	const palette = ["#FFF", "#000", "#c0ffee", "#BADA55", "#f0f8", "#12345678"];
	for (let v = 0; v < 256; v += 15) {
		const colour = `#${v.toString(16).padStart(2, "0")}8040`;
		expect(palette).toContain(findNearestHexColour(colour, palette));
	}
});

test("accepts readonly palettes, keeps literal types and does not mutate", () => {
	const palette = Object.freeze(["#fff", "#000"] as const);
	const result = findNearestHexColour("#111", palette);
	expectTypeOf(result).toEqualTypeOf<"#fff" | "#000" | null>();
	expect(result).toBe("#000");
	expect(palette).toEqual(["#fff", "#000"]);
});
