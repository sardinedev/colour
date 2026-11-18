import { describe, expect, expectTypeOf, test, vi } from "vitest";
import * as convertRGBtoLabModule from "./convertRGBtoLab";
import { findNearestRGBColour } from "./findNearestRGBColour";
import { RGBdistance } from "./RGBdistance";
import type { RGBColour } from "./types";

test("should return the nearest colour from a palette", () => {
	const palette = [
		{ R: 255, G: 255, B: 255 },
		{ R: 5, G: 5, B: 5 },
	];
	const colour = { R: 0, G: 0, B: 0 };
	expect(findNearestRGBColour(colour, palette)).toBe(palette[1]);
});

test("converts the target to Lab once and keeps the first equally near colour", () => {
	const colour = { R: 0, G: 0, B: 0 };
	const first = { R: 5, G: 5, B: 5 };
	const second = { R: 5, G: 5, B: 5 };
	const convertSpy = vi.spyOn(convertRGBtoLabModule, "convertRGBtoLab");

	expect(findNearestRGBColour(colour, [first, second])).toBe(first);
	expect(
		convertSpy.mock.calls.filter(([candidate]) => candidate === colour),
	).toHaveLength(1);
	expect(convertSpy).toHaveBeenCalledTimes(3);

	convertSpy.mockRestore();
});

test("matches RGBdistance selection for fractional and alpha channels", () => {
	const cases: [RGBColour, RGBColour[]][] = [
		[
			{ R: 31.5, G: 63.25, B: 201.75, A: 0.25 },
			[
				{ R: 31.50001, G: 63.25, B: 201.75, A: 1 },
				{ R: 31.5, G: 63.25001, B: 201.75, A: 0 },
				{ R: 32, G: 64, B: 202, A: 0.5 },
			],
		],
	];

	for (const [colour, palette] of cases) {
		let expected: RGBColour | null = null;
		let minDistance = Number.POSITIVE_INFINITY;
		for (const paletteColour of palette) {
			const distance = RGBdistance(colour, paletteColour);
			if (distance < minDistance) {
				minDistance = distance;
				expected = paletteColour;
			}
		}
		expect(findNearestRGBColour(colour, palette)).toBe(expected);
	}
});

test("returns the palette object itself", () => {
	const palette = [
		{ R: 250, G: 0, B: 0 },
		{ R: 0, G: 0, B: 0 },
	];
	expect(findNearestRGBColour({ R: 255, G: 0, B: 0 }, palette)).toBe(
		palette[0],
	);
});

describe("edge cases", () => {
	const palette = [
		{ R: 0, G: 0, B: 0 },
		{ R: 255, G: 255, B: 255 },
	];
	test.each([
		["missing palette", { R: 0, G: 0, B: 0 }, undefined],
		["empty palette", { R: 0, G: 0, B: 0 }, []],
		["NaN target channel", { R: Number.NaN, G: 0, B: 0 }, palette],
		["missing target channel", { R: 0, G: 0 }, palette],
		["string target", "#000", palette],
		["null target", null, palette],
		["non-finite target alpha", { R: 0, G: 0, B: 0, A: Number.NaN }, palette],
		[
			"all entries invalid",
			{ R: 0, G: 0, B: 0 },
			[{ R: Number.NaN, G: 0, B: 0 }, null, "#000", { R: 0, G: 0 }],
		],
	])("returns null for %s", (_, colour, palette) => {
		expect(
			// @ts-expect-error - checking runtime behaviour for JS consumers
			findNearestRGBColour(colour, palette),
		).toBeNull();
	});

	test("returns the only valid entry", () => {
		const only = { R: 0, G: 0, B: 255 };
		expect(findNearestRGBColour({ R: 255, G: 0, B: 0 }, [only])).toBe(only);
		const mixed = [{ R: Number.NaN, G: 0, B: 0 }, only];
		expect(findNearestRGBColour({ R: 255, G: 0, B: 0 }, mixed)).toBe(only);
	});

	test("clamps out-of-range channels for the distance but returns the original object", () => {
		const outOfRange = { R: 300, G: -10, B: 0, A: 2 };
		const near = { R: 250, G: 0, B: 0 };
		expect(
			findNearestRGBColour({ R: 255, G: 0, B: 0 }, [near, outOfRange]),
		).toBe(outOfRange);
		const exact = { R: 255, G: 0, B: 0 };
		expect(findNearestRGBColour({ R: 400, G: 0, B: 0 }, [near, exact])).toBe(
			exact,
		);
	});

	test("ignores alpha on both sides", () => {
		const opaqueBlack = { R: 0, G: 0, B: 0, A: 1 };
		const transparentWhite = { R: 255, G: 255, B: 255, A: 0 };
		expect(
			findNearestRGBColour({ R: 0, G: 0, B: 0, A: 0 }, [
				transparentWhite,
				opaqueBlack,
			]),
		).toBe(opaqueBlack);
	});
});

test("accepts readonly palettes, keeps the entry type and does not mutate", () => {
	interface Swatch extends RGBColour {
		name: string;
	}
	const palette: readonly Swatch[] = Object.freeze([
		Object.freeze({ R: 255, G: 255, B: 255, name: "paper" }),
		Object.freeze({ R: 10, G: 10, B: 10, name: "ink" }),
	]);
	const result = findNearestRGBColour({ R: 0, G: 0, B: 0 }, palette);
	expectTypeOf(result).toEqualTypeOf<Swatch | null>();
	expect(result?.name).toBe("ink");
	expect(palette[1]).toEqual({ R: 10, G: 10, B: 10, name: "ink" });
});
