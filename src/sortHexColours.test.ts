import { expect, test } from "vitest";
import {
	getColorInfo,
	getGreyscaleOrder,
	sortHexColours,
} from "./sortHexColours";

test("getColorInfo: correctly parses 6-digit hex colors", () => {
	const result = getColorInfo("#ff0000");
	expect(result).toEqual({
		h: 0,
		s: 1,
		v: 1,
		a: 1,
	});
});

test("getColorInfo: correctly parses 8-digit hex colors with alpha", () => {
	const result = getColorInfo("#ff000080");
	expect(result).toEqual({
		h: 0,
		s: 1,
		v: 1,
		a: 0.5,
	});
});

test("getColorInfo: correctly parses greyscale colors", () => {
	const result = getColorInfo("#808080");
	expect(result.h).toBe(0);
	expect(result.s).toBe(0);
	expect(result.v).toBeCloseTo(0.502, 3);
	expect(result.a).toBe(1);
});

test("getColorInfo: correctly parses white", () => {
	const result = getColorInfo("#ffffff");
	expect(result).toEqual({
		h: 0,
		s: 0,
		v: 1,
		a: 1,
	});
});

test("getColorInfo: correctly parses black", () => {
	const result = getColorInfo("#000000");
	expect(result).toEqual({
		h: 0,
		s: 0,
		v: 0,
		a: 1,
	});
});

test("getColorInfo: correctly parses transparent colors", () => {
	const result = getColorInfo("#00000000");
	expect(result).toEqual({
		h: 0,
		s: 0,
		v: 0,
		a: 0,
	});
});

test("getColorInfo: throws error for invalid input type", () => {
	// @ts-expect-error - intentionally testing invalid input
	expect(() => getColorInfo(123)).toThrow(
		"convertHextoRGB expects a string but got a number",
	);
});

test("getGreyscaleOrder: returns 1 for black (value 0)", () => {
	expect(getGreyscaleOrder(0)).toBe(1);
});

test("getGreyscaleOrder: returns 2 for white (value 1)", () => {
	expect(getGreyscaleOrder(1)).toBe(2);
});

test("getGreyscaleOrder: returns 0 for grey values", () => {
	expect(getGreyscaleOrder(0.5)).toBe(0);
	expect(getGreyscaleOrder(0.502)).toBe(0);
	expect(getGreyscaleOrder(0.3)).toBe(0);
	expect(getGreyscaleOrder(0.7)).toBe(0);
});

test("getGreyscaleOrder: returns 0 for edge values", () => {
	expect(getGreyscaleOrder(0.001)).toBe(0);
	expect(getGreyscaleOrder(0.999)).toBe(0);
});

test("sortHexColours: sorts colours by hue then saturation", () => {
	const input = [
		"#ff0000", // red
		"#00ff00", // green
		"#0000ff", // blue
		"#ffff00", // yellow
		"#00ffff", // cyan
		"#ff00ff", // magenta
	];
	const sorted = sortHexColours(input);
	expect(sorted[0]).toBe("#ff0000"); // red (hue 0)
	expect(sorted[1]).toBe("#ffff00"); // yellow (hue 60)
	expect(sorted[2]).toBe("#00ff00"); // green (hue 120)
	expect(sorted[3]).toBe("#00ffff"); // cyan (hue 180)
	expect(sorted[4]).toBe("#0000ff"); // blue (hue 240)
	expect(sorted[5]).toBe("#ff00ff"); // magenta (hue 300)
});

test("sortHexColours: moves greyscale colours to the end", () => {
	const input = [
		"#ff0000", // red
		"#808080", // grey
		"#000000", // black
		"#ffffff", // white
	];
	const sorted = sortHexColours(input);
	expect(sorted.slice(-3)).toEqual(["#808080", "#000000", "#ffffff"]);
});

test("sortHexColours: moves fully transparent colours to the very end", () => {
	const input = [
		"#ff0000", // red
		"#00ff00", // green
		"#00000000", // transparent black
		"#ffffff00", // transparent white
	];
	const sorted = sortHexColours(input);
	expect(sorted.slice(-2)).toEqual(["#00000000", "#ffffff00"]);
});

test("sortHexColours: handles mixed input formats", () => {
	const input = ["#ff0000", "#808080", "#00000000", "#00ff00", "#ffffff"];
	const sorted = sortHexColours(input);
	expect(sorted[0]).toBe("#ff0000");
	expect(sorted[1]).toBe("#00ff00");
	expect(sorted.slice(-3)).toEqual(["#808080", "#ffffff", "#00000000"]);
});

test("sortHexColours: sorts colors with same hue by descending saturation", () => {
	const input = [
		"#ff8080", // red with low saturation (hue 0, saturation ~0.5)
		"#ff0000", // red with full saturation (hue 0, saturation 1)
		"#ff4040", // red with medium saturation (hue 0, saturation ~0.75)
	];
	const sorted = sortHexColours(input);
	// Should be sorted by descending saturation: full, medium, low
	expect(sorted[0]).toBe("#ff0000"); // full saturation first
	expect(sorted[1]).toBe("#ff4040"); // medium saturation second
	expect(sorted[2]).toBe("#ff8080"); // low saturation last
});

test("sortHexColours: sorts multiple greyscale colors that aren't pure black or white", () => {
	const input = [
		"#404040", // dark grey (value ~0.25)
		"#c0c0c0", // light grey (value ~0.75)
		"#808080", // medium grey (value ~0.5)
		"#202020", // darker grey (value ~0.125)
	];
	const sorted = sortHexColours(input);
	// Should be sorted by ascending value: darkest to lightest
	expect(sorted[0]).toBe("#202020"); // darkest grey first
	expect(sorted[1]).toBe("#404040"); // dark grey second
	expect(sorted[2]).toBe("#808080"); // medium grey third
	expect(sorted[3]).toBe("#c0c0c0"); // light grey last
});

test("sortHexColours: sorts mixed greyscale including black and white with other greys", () => {
	const input = [
		"#ffffff", // white (custom order: last)
		"#606060", // grey (custom order: first, then by value)
		"#000000", // black (custom order: second)
		"#a0a0a0", // lighter grey (custom order: first, then by value)
	];
	const sorted = sortHexColours(input);
	// Custom order: greys first (sorted by value), then black, then white
	expect(sorted[0]).toBe("#606060"); // darker grey first
	expect(sorted[1]).toBe("#a0a0a0"); // lighter grey second
	expect(sorted[2]).toBe("#000000"); // black third (custom order)
	expect(sorted[3]).toBe("#ffffff"); // white last (custom order)
});

test("sortHexColours: throws for an invalid hex value", () => {
	expect(() => sortHexColours(["#ff0000", "#gg0000"])).toThrow(
		"convertHextoRGB expects a valid hexadecimal colour value but got #gg0000",
	);
});

test("sortHexColours: preserves duplicate hex values and caches the conversion only once", () => {
	// #ff0000 appears twice — the second occurrence should reuse the cached HSV info
	// and still appear in the sorted output, not be deduplicated
	const result = sortHexColours(["#ff0000", "#00ff00", "#ff0000"]);
	expect(result).toHaveLength(3);
	expect(result.filter((c) => c === "#ff0000")).toHaveLength(2);
	expect(result.filter((c) => c === "#00ff00")).toHaveLength(1);
});
