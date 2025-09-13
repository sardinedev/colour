import { describe, expect, it } from "vitest";
import {
	getColorInfo,
	getGreyscaleOrder,
	sortHexColours,
} from "./sortHexColours";

describe("getColorInfo", () => {
	it("correctly parses 6-digit hex colors", () => {
		const result = getColorInfo("#ff0000");
		expect(result).toEqual({
			h: 0,
			s: 1,
			v: 1,
			a: 1,
		});
	});

	it("correctly parses 8-digit hex colors with alpha", () => {
		const result = getColorInfo("#ff000080");
		expect(result).toEqual({
			h: 0,
			s: 1,
			v: 1,
			a: 0.5,
		});
	});

	it("correctly parses greyscale colors", () => {
		const result = getColorInfo("#808080");
		expect(result.h).toBe(0);
		expect(result.s).toBe(0);
		expect(result.v).toBeCloseTo(0.502, 3);
		expect(result.a).toBe(1);
	});

	it("correctly parses white", () => {
		const result = getColorInfo("#ffffff");
		expect(result).toEqual({
			h: 0,
			s: 0,
			v: 1,
			a: 1,
		});
	});

	it("correctly parses black", () => {
		const result = getColorInfo("#000000");
		expect(result).toEqual({
			h: 0,
			s: 0,
			v: 0,
			a: 1,
		});
	});

	it("correctly parses transparent colors", () => {
		const result = getColorInfo("#00000000");
		expect(result).toEqual({
			h: 0,
			s: 0,
			v: 0,
			a: 0,
		});
	});

	it("throws error for invalid input type", () => {
		// @ts-ignore - intentionally testing invalid input
		expect(() => getColorInfo(123)).toThrow(
			"convertHextoRGB expects a string but got a number",
		);
	});
});

describe("getGreyscaleOrder", () => {
	it("returns 1 for black (value 0)", () => {
		expect(getGreyscaleOrder(0)).toBe(1);
	});

	it("returns 2 for white (value 1)", () => {
		expect(getGreyscaleOrder(1)).toBe(2);
	});

	it("returns 0 for gray values", () => {
		expect(getGreyscaleOrder(0.5)).toBe(0);
		expect(getGreyscaleOrder(0.502)).toBe(0);
		expect(getGreyscaleOrder(0.3)).toBe(0);
		expect(getGreyscaleOrder(0.7)).toBe(0);
	});

	it("returns 0 for edge values", () => {
		expect(getGreyscaleOrder(0.001)).toBe(0);
		expect(getGreyscaleOrder(0.999)).toBe(0);
	});
});

describe("sortHexColours", () => {
	it("sorts colours by hue then saturation", () => {
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

	it("moves greyscale colours to the end", () => {
		const input = [
			"#ff0000", // red
			"#808080", // grey
			"#000000", // black
			"#ffffff", // white
		];
		const sorted = sortHexColours(input);
		expect(sorted.slice(-3)).toEqual(["#808080", "#000000", "#ffffff"]);
	});

	it("moves fully transparent colours to the very end", () => {
		const input = [
			"#ff0000", // red
			"#00ff00", // green
			"#00000000", // transparent black
			"#ffffff00", // transparent white
		];
		const sorted = sortHexColours(input);
		expect(sorted.slice(-2)).toEqual(["#00000000", "#ffffff00"]);
	});

	it("handles mixed input formats", () => {
		const input = ["#ff0000", "#808080", "#00000000", "#00ff00", "#ffffff"];
		const sorted = sortHexColours(input);
		expect(sorted[0]).toBe("#ff0000");
		expect(sorted[1]).toBe("#00ff00");
		expect(sorted.slice(-3)).toEqual(["#808080", "#ffffff", "#00000000"]);
	});

	it("sorts colors with same hue by descending saturation", () => {
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

	it("sorts multiple greyscale colors that aren't pure black or white", () => {
		const input = [
			"#404040", // dark gray (value ~0.25)
			"#c0c0c0", // light gray (value ~0.75)
			"#808080", // medium gray (value ~0.5)
			"#202020", // darker gray (value ~0.125)
		];
		const sorted = sortHexColours(input);
		// Should be sorted by ascending value: darkest to lightest
		expect(sorted[0]).toBe("#202020"); // darkest gray first
		expect(sorted[1]).toBe("#404040"); // dark gray second
		expect(sorted[2]).toBe("#808080"); // medium gray third
		expect(sorted[3]).toBe("#c0c0c0"); // light gray last
	});

	it("sorts mixed greyscale including black and white with other grays", () => {
		const input = [
			"#ffffff", // white (custom order: last)
			"#606060", // gray (custom order: first, then by value)
			"#000000", // black (custom order: second)
			"#a0a0a0", // lighter gray (custom order: first, then by value)
		];
		const sorted = sortHexColours(input);
		// Custom order: grays first (sorted by value), then black, then white
		expect(sorted[0]).toBe("#606060"); // darker gray first
		expect(sorted[1]).toBe("#a0a0a0"); // lighter gray second
		expect(sorted[2]).toBe("#000000"); // black third (custom order)
		expect(sorted[3]).toBe("#ffffff"); // white last (custom order)
	});
});
