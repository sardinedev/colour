import { expect, expectTypeOf, test } from "vitest";
import {
	convertCSSRGBtoHex,
	convertCSSRGBtoRGB,
	convertHextoNamedCSSColour,
	convertNamedCSSColourtoHex,
	convertNamedCSSColourtoRGB,
	convertRGBtoNamedCSSColour,
	getContrastRatio,
	getContrastRatioFromCSSRGB,
	getContrastRatioFromHex,
	getContrastRatioFromNamedCSSColour,
	getSRGBLuminanceFromHex,
	isNamedCSSColour,
	parseColour,
	pickHexColourContrast,
	preparePalette,
} from "./index";

import type {
	LabColour,
	NamedCSSColour,
	PickHexColourContrastOptions,
	PreparedEntry,
	PreparedPalette,
	PreparedRGBColour,
	RGBColour,
	XYZColour,
} from "./index";

test("public types are importable from the root", () => {
	expectTypeOf<RGBColour>().toEqualTypeOf<{
		R: number;
		G: number;
		B: number;
		A?: number | undefined;
	}>();
	expectTypeOf<LabColour>().toEqualTypeOf<{
		L: number;
		a: number;
		b: number;
	}>();
	expectTypeOf<XYZColour>().toEqualTypeOf<{
		X: number;
		Y: number;
		Z: number;
	}>();
	expectTypeOf<"hotpink">().toExtend<NamedCSSColour>();
	expectTypeOf(pickHexColourContrast)
		.parameter(0)
		.toEqualTypeOf<PickHexColourContrastOptions>();
});

test("failable APIs are typed as nullable, never undefined", () => {
	expectTypeOf(parseColour).returns.toEqualTypeOf<RGBColour | null>();
	expectTypeOf(convertCSSRGBtoRGB).returns.toEqualTypeOf<RGBColour | null>();
	expectTypeOf(convertCSSRGBtoHex).returns.toEqualTypeOf<string | null>();
	expectTypeOf(convertNamedCSSColourtoHex).returns.toEqualTypeOf<
		string | null
	>();
	expectTypeOf(
		convertNamedCSSColourtoRGB,
	).returns.toEqualTypeOf<RGBColour | null>();
	expectTypeOf(
		convertHextoNamedCSSColour,
	).returns.toEqualTypeOf<NamedCSSColour | null>();
	expectTypeOf(
		convertRGBtoNamedCSSColour,
	).returns.toEqualTypeOf<NamedCSSColour | null>();
	expectTypeOf(getContrastRatio).returns.toEqualTypeOf<number | null>();
	expectTypeOf(getContrastRatioFromHex).returns.toEqualTypeOf<number | null>();
	expectTypeOf(getContrastRatioFromCSSRGB).returns.toEqualTypeOf<
		number | null
	>();
	expectTypeOf(getContrastRatioFromNamedCSSColour).returns.toEqualTypeOf<
		number | null
	>();
	expectTypeOf(getSRGBLuminanceFromHex).returns.toEqualTypeOf<number | null>();
});

test("isNamedCSSColour accepts any string and narrows canonical names", () => {
	const input: string = "hotpink";
	if (isNamedCSSColour(input)) {
		expectTypeOf(input).toEqualTypeOf<NamedCSSColour>();
		expect(convertNamedCSSColourtoHex(input)).toBe("#ff69b4");
	} else {
		throw new Error("hotpink should be a named CSS colour");
	}
	expect(isNamedCSSColour("HotPink")).toBe(false);
	expect(isNamedCSSColour("toString")).toBe(false);
});

test("preparePalette and its types are exported from the root", () => {
	const nearest = preparePalette(["#fff", "#000"] as const);
	expectTypeOf(nearest).toEqualTypeOf<PreparedPalette<"#fff" | "#000">>();
	expectTypeOf(nearest).returns.toEqualTypeOf<PreparedEntry<
		"#fff" | "#000"
	> | null>();
	expectTypeOf<PreparedEntry<RGBColour>>().toEqualTypeOf<PreparedRGBColour>();
	expect(nearest("#111")).toBe("#000");
});
