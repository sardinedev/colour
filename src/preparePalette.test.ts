import { expect, test } from "vitest";
import { findNearestRGBColour } from "./findNearestRGBColour";
import { preparePalette } from "./preparePalette";

test("preserves string tokens and picks the closest candidate", () => {
	const nearest = preparePalette(["#000", "#FFFFFF", "red"]);

	expect(nearest("#010101")).toBe("#000");
	expect(preparePalette(["#ff0000", "blue"])("rgb(254 0 0)")).toBe("#ff0000");
});

test("keeps the first candidate when distances tie", () => {
	const nearest = preparePalette(["#000", "#000000"]);

	expect(nearest("black")).toBe("#000");
});

test("skips invalid candidates and returns null for invalid targets or empty palettes", () => {
	const nearest = preparePalette(["not-a-colour", "#ffffff"]);

	expect(nearest("#000000")).toBe("#ffffff");
	expect(nearest("not-a-colour")).toBeNull();
	expect(preparePalette(["invalid"])("red")).toBeNull();
	expect(preparePalette([])("red")).toBeNull();
});

test("returns a frozen RGB snapshot independent of caller mutations", () => {
	const first = { R: 0, G: 0, B: 0, A: 0.25 };
	const palette = [first, { R: 255, G: 255, B: 255 }];
	const nearest = preparePalette(palette);
	palette.reverse();
	palette.push({ R: 100, G: 100, B: 100 });
	first.R = 255;

	const result = nearest({ R: 1, G: 1, B: 1 });
	expect(result).toStrictEqual({ R: 0, G: 0, B: 0, A: 0.25 });
	expect(result).not.toBe(first);
	expect(Object.isFrozen(result)).toBe(true);
	expect(Reflect.set(result as object, "R", 200)).toBe(false);
	expect(nearest({ R: 1, G: 1, B: 1 })).toStrictEqual(result);
});

test("ignores alpha when comparing RGB candidates", () => {
	const nearest = preparePalette([
		{ R: 1.5, G: 2, B: 3, A: 0 },
		{ R: 1.5, G: 2, B: 3, A: 1 },
	]);

	expect(nearest({ R: 1.5, G: 2, B: 3, A: 0.5 })).toStrictEqual({
		R: 1.5,
		G: 2,
		B: 3,
		A: 0,
	});
});

test("matches the one-shot RGB selection for fractional channels", () => {
	const palette = [
		{ R: 31.5, G: 63.25, B: 201.75, A: 0.25 },
		{ R: 32, G: 64, B: 202, A: 0.5 },
		{ R: 100, G: 120, B: 140 },
	];
	const target = { R: 31.75, G: 63.5, B: 201.5, A: 1 };
	const result = preparePalette(palette)(target);

	expect(result).toStrictEqual(findNearestRGBColour(target, palette));
	expect(result).not.toBe(palette[0]);
});

test("skips RGB candidates with invalid channels", () => {
	const nearest = preparePalette([
		{ R: Number.NaN, G: 0, B: 0 },
		{ R: 255, G: 255, B: 255 },
	]);

	expect(nearest({ R: 0, G: 0, B: 0 })).toStrictEqual({
		R: 255,
		G: 255,
		B: 255,
	});
	expect(nearest({ R: Number.NaN, G: 0, B: 0 })).toBeNull();
});
