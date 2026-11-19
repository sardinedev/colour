import { describe, expect, expectTypeOf, test } from "vitest";
import { findNearestColour } from "./findNearestColour";
import { findNearestRGBColour } from "./findNearestRGBColour";
import { type PreparedRGBColour, preparePalette } from "./preparePalette";
import type { RGBColour } from "./types";

function createRandom(seed: number) {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
}
const random = createRandom(499);
const channel = () => Math.floor(random() * 256);
const randomRGB = (): RGBColour => ({
	R: channel(),
	G: channel(),
	B: channel(),
});
const toHex = ({ R, G, B }: RGBColour) =>
	`#${[R, G, B].map((n) => n.toString(16).padStart(2, "0")).join("")}`;

const TARGETS = Array.from({ length: 200 }, randomRGB);
const MIXED_PALETTE = [
	...Array.from({ length: 40 }, () => toHex(randomRGB())),
	...Array.from({ length: 40 }, () => {
		const { R, G, B } = randomRGB();
		return `rgb(${R}, ${G}, ${B})`;
	}),
	"hotpink",
	"rebeccapurple",
	"cyan",
	"aqua",
	"#FFF",
	"rgb(50% 25% 100% / 0.5)",
	"bogus",
];
const RGB_PALETTE = Array.from({ length: 80 }, randomRGB);

describe("selection matches the one-shot functions", () => {
	test("string palettes return the same entry as findNearestColour", () => {
		const nearest = preparePalette(MIXED_PALETTE);
		for (const target of TARGETS) {
			for (const colour of [
				toHex(target),
				`rgb(${target.R} ${target.G} ${target.B})`,
			]) {
				expect(nearest(colour)).toBe(findNearestColour(colour, MIXED_PALETTE));
			}
		}
	});

	test("RGB palettes return the same values as findNearestRGBColour", () => {
		const nearest = preparePalette(RGB_PALETTE);
		for (const target of TARGETS) {
			expect(nearest(target)).toEqual(
				findNearestRGBColour(target, RGB_PALETTE),
			);
		}
	});

	test("out-of-range RGB entries are measured clamped, like findNearestRGBColour", () => {
		const palette = [
			{ R: 250, G: 0, B: 0 },
			{ R: 300, G: -10, B: 0 },
		];
		const target = { R: 255, G: 0, B: 0 };
		expect(preparePalette(palette)(target)).toEqual(
			findNearestRGBColour(target, palette),
		);
	});
});

describe("ties and duplicates", () => {
	test("keeps the first of equally near entries", () => {
		expect(preparePalette(["#111", "#111111", "rgb(17 17 17)"])("#000")).toBe(
			"#111",
		);
		expect(preparePalette(["gray", "grey"])("black")).toBe("gray");
		const first = { R: 5, G: 5, B: 5 };
		expect(
			preparePalette([first, { R: 5, G: 5, B: 5 }])({ R: 0, G: 0, B: 0 }),
		).toEqual(first);
	});

	test("ignores alpha", () => {
		expect(preparePalette(["#00ff00", "#ff000000"])("#ff0000")).toBe(
			"#ff000000",
		);
	});
});

describe("invalid input", () => {
	test.each([
		["missing palette", undefined],
		["empty palette", []],
		[
			"only invalid entries",
			["bogus", "#12345", { R: Number.NaN, G: 0, B: 0 }, null],
		],
	])("returns null for every lookup with %s", (_, palette) => {
		// @ts-expect-error - checking runtime behaviour for JS consumers
		const nearest = preparePalette(palette);
		expect(nearest("#000")).toBeNull();
		expect(nearest({ R: 0, G: 0, B: 0 })).toBeNull();
	});

	test.each([
		"nope",
		"",
		"#12345",
		null,
		undefined,
		42,
		{ R: Number.NaN, G: 0, B: 0 },
		{ R: 0, G: 0 },
	])("returns null for invalid target %j", (target) => {
		// @ts-expect-error - checking runtime behaviour for JS consumers
		expect(preparePalette(["#000", "#fff"])(target)).toBeNull();
	});

	test("skips invalid entries", () => {
		expect(preparePalette(["bogus", "#00f", "Red"])("#f00")).toBe("#00f");
	});
});

describe("snapshot independence", () => {
	test("edits to the source array after preparing have no effect", () => {
		const palette = ["#000000", "#ffffff"];
		const nearest = preparePalette(palette);
		palette[0] = "#ff0000";
		palette.push("#010101");
		expect(nearest("#020202")).toBe("#000000");
	});

	test("edits to source RGB objects after preparing have no effect", () => {
		const black = { R: 0, G: 0, B: 0 };
		const white = { R: 255, G: 255, B: 255 };
		const nearest = preparePalette([black, white]);
		black.R = 255;
		black.G = 255;
		black.B = 255;
		const result = nearest({ R: 10, G: 10, B: 10 });
		expect(result).toEqual({ R: 0, G: 0, B: 0 });
		expect(result).not.toBe(black);
	});

	test("returned RGB entries are frozen copies, so callers can't corrupt the snapshot", () => {
		const source = { R: 0, G: 0, B: 0, A: 0.5 };
		const nearest = preparePalette([source, { R: 255, G: 255, B: 255 }]);
		const result = nearest({ R: 1, G: 1, B: 1 });
		expect(result).toEqual(source);
		expect(result).not.toBe(source);
		expect(Object.isFrozen(result)).toBe(true);
		expect(() => {
			// @ts-expect-error - prepared entries are readonly
			result.R = 255;
		}).toThrow(TypeError);
		expect(nearest({ R: 1, G: 1, B: 1 })).toEqual({ R: 0, G: 0, B: 0, A: 0.5 });
	});

	test("preparing does not mutate or freeze the caller's palette", () => {
		const source = { R: 1, G: 2, B: 3 };
		const palette = [source, "#fff"];
		preparePalette(palette);
		expect(Object.isFrozen(palette)).toBe(false);
		expect(Object.isFrozen(source)).toBe(false);
		expect(palette).toEqual([{ R: 1, G: 2, B: 3 }, "#fff"]);
	});
});

test("types: strings keep their literal types, RGB entries come back readonly", () => {
	const strings = preparePalette(["#fff", "black"] as const);
	expectTypeOf(strings).returns.toEqualTypeOf<"#fff" | "black" | null>();
	const rgb = preparePalette([{ R: 0, G: 0, B: 0 }]);
	expectTypeOf(rgb).returns.toEqualTypeOf<PreparedRGBColour | null>();
});
