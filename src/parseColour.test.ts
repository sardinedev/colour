import { describe, expect, test } from "vitest";
import { parseColour } from "./parseColour";

describe("strings", () => {
	test.each([
		["#fff", { R: 255, G: 255, B: 255 }],
		["#102030", { R: 16, G: 32, B: 48 }],
		["#10203080", { R: 16, G: 32, B: 48, A: 128 / 255 }],
		["rgb(255 0 0 / 50%)", { R: 255, G: 0, B: 0, A: 0.5 }],
		["rgba(50%, 25%, 100%, 0.8)", { R: 127.5, G: 63.75, B: 255, A: 0.8 }],
		["hotpink", { R: 255, G: 105, B: 180 }],
		["transparent", { R: 0, G: 0, B: 0, A: 0 }],
	])("parses %j", (input, expected) => {
		expect(parseColour(input)).toStrictEqual(expected);
	});

	test("clamps out-of-range CSS RGB values", () => {
		expect(parseColour("rgba(-10, 300, 128, 1.5)")).toStrictEqual({
			R: 0,
			G: 255,
			B: 128,
			A: 1,
		});
	});

	test.each([
		"",
		"fff",
		"#ggg",
		"#12345",
		"rgb(1, 2)",
		"Red",
		" red",
		"toString",
		"not-a-colour",
	])("returns null for unsupported string %j", (input) => {
		expect(parseColour(input)).toBeNull();
	});
});

describe("RGB objects", () => {
	test("returns a new object with the same channels", () => {
		const input = { R: 12.5, G: 34, B: 56, A: 0.25 };
		const result = parseColour(input);
		expect(result).toStrictEqual(input);
		expect(result).not.toBe(input);
	});

	test("does not mutate the input", () => {
		const input = Object.freeze({ R: 300, G: -1, B: 0, A: 2 });
		expect(parseColour(input)).toStrictEqual({ R: 255, G: 0, B: 0, A: 1 });
		expect(input).toStrictEqual({ R: 300, G: -1, B: 0, A: 2 });
	});

	test("clamps finite out-of-range channels and alpha", () => {
		expect(parseColour({ R: -5, G: 256, B: 1e9, A: -0.5 })).toStrictEqual({
			R: 0,
			G: 255,
			B: 255,
			A: 0,
		});
	});

	test("treats a missing alpha as opaque and leaves it out", () => {
		expect(parseColour({ R: 1, G: 2, B: 3 })).toStrictEqual({
			R: 1,
			G: 2,
			B: 3,
		});
		expect(parseColour({ R: 1, G: 2, B: 3, A: undefined })).toStrictEqual({
			R: 1,
			G: 2,
			B: 3,
		});
	});

	test("keeps zero and one alpha", () => {
		expect(parseColour({ R: 1, G: 2, B: 3, A: 0 })?.A).toBe(0);
		expect(parseColour({ R: 1, G: 2, B: 3, A: 1 })?.A).toBe(1);
	});

	test("ignores extra properties", () => {
		expect(parseColour({ R: 1, G: 2, B: 3, name: "x" })).toStrictEqual({
			R: 1,
			G: 2,
			B: 3,
		});
	});

	test.each([
		[{ G: 0, B: 0 }],
		[{ R: 0, G: 0 }],
		[{ R: Number.NaN, G: 0, B: 0 }],
		[{ R: 0, G: Number.POSITIVE_INFINITY, B: 0 }],
		[{ R: 0, G: 0, B: Number.NEGATIVE_INFINITY }],
		[{ R: "255", G: 0, B: 0 }],
		[{ R: 0, G: 0, B: 0, A: Number.NaN }],
		[{ R: 0, G: 0, B: 0, A: "0.5" }],
		[{ R: 0, G: 0, B: 0, A: null }],
		[{ r: 0, g: 0, b: 0 }],
	])("returns null for invalid RGB object %j", (input) => {
		expect(parseColour(input)).toBeNull();
	});
});

test.each([null, undefined, 0, 255, true, [255, 0, 0], () => "#fff"])(
	"returns null for unsupported value %j",
	(input) => {
		expect(parseColour(input)).toBeNull();
	},
);
