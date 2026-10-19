import { describe, test } from "vitest";
import {
	ciede2000,
	convertRGBtoLab,
	findNearestColour,
	findNearestCSSRGBColour,
	findNearestHexColour,
	findNearestNamedCSSColour,
	findNearestRGBColour,
	getContrastRatio,
	getContrastRatioFromCSSRGB,
	getContrastRatioFromHex,
	getContrastRatioFromNamedCSSColour,
	getSRGBLuminanceFromHex,
	getSRGBLuminanceFromRGB,
	isCSSNamedDarkColour,
	isCSSRGBDarkColour,
	isDarkColour,
	isHexDarkColour,
	pickHexColourContrast,
	RGBdistance,
	sortHexColours,
} from "../src/index";
import type { WCAG } from "../src/types";
import {
	CSS_RGB_COLOURS,
	CSS_RGB_PALETTE,
	HEX_COLOURS,
	LARGE_HEX_PALETTE,
	LARGE_RGB_PALETTE,
	NAMED_COLOURS,
	RGB_COLOURS,
} from "./fixtures";

const LAB_COLOURS = RGB_COLOURS.map((c) => convertRGBtoLab(c));
const MIXED_PALETTE = [
	...LARGE_HEX_PALETTE.slice(0, 100),
	...CSS_RGB_PALETTE.slice(0, 100),
	"red",
	"rebeccapurple",
	"aliceblue",
];

describe("analysis", () => {
	test("colour difference", async ({ bench }) => {
		await bench.compare(
			bench("ciede2000", () => {
				for (let i = 1; i < LAB_COLOURS.length; i++) {
					// biome-ignore lint/style/noNonNullAssertion: indices are in range
					ciede2000(LAB_COLOURS[i - 1]!, LAB_COLOURS[i]!);
				}
			}),
			bench("RGBdistance", () => {
				for (let i = 1; i < RGB_COLOURS.length; i++) {
					// biome-ignore lint/style/noNonNullAssertion: indices are in range
					RGBdistance(RGB_COLOURS[i - 1]!, RGB_COLOURS[i]!);
				}
			}),
		);
	});

	test("contrast and luminance", async ({ bench }) => {
		await bench.compare(
			bench("getSRGBLuminanceFromHex", () => {
				for (const hex of HEX_COLOURS) getSRGBLuminanceFromHex(hex, "WCAG2.1");
			}),
			bench("getSRGBLuminanceFromRGB", () => {
				for (const rgb of RGB_COLOURS) getSRGBLuminanceFromRGB(rgb, "WCAG2.1");
			}),
			bench("getContrastRatioFromHex", () => {
				for (const hex of HEX_COLOURS) {
					getContrastRatioFromHex(hex, "#ffffff", "WCAG2.1");
				}
			}),
			bench("getContrastRatioFromCSSRGB", () => {
				for (const css of CSS_RGB_COLOURS) {
					getContrastRatioFromCSSRGB(css, "rgb(255, 255, 255)", "WCAG2.1");
				}
			}),
			bench("getContrastRatioFromNamedCSSColour", () => {
				for (const name of NAMED_COLOURS) {
					getContrastRatioFromNamedCSSColour(name, "white", "WCAG2.1");
				}
			}),
			bench("getContrastRatio (mixed formats)", () => {
				getContrastRatio("red", "#00FF00", "WCAG2.1");
				getContrastRatio("rgb(12, 34, 56)", "aliceblue", "WCAG2.1");
				getContrastRatio("#bada55", "rgb(255, 255, 255)", "WCAG3.0");
			}),
			bench("pickHexColourContrast", () => {
				for (const hex of HEX_COLOURS) {
					pickHexColourContrast(
						{
							backgroundColour: hex,
							optionOneColour: "#FFFFFF",
							optionTwoColour: "#000000",
						},
						"WCAG2.1",
					);
				}
			}),
			bench("isDarkColour", () => {
				for (const hex of HEX_COLOURS) isDarkColour(hex, "WCAG2.1");
			}),
			bench("isHexDarkColour", () => {
				for (const hex of HEX_COLOURS) isHexDarkColour(hex, "WCAG2.1");
			}),
			bench("isCSSRGBDarkColour", () => {
				for (const css of CSS_RGB_COLOURS) isCSSRGBDarkColour(css, "WCAG2.1");
			}),
			bench("isCSSNamedDarkColour", () => {
				for (const name of NAMED_COLOURS) isCSSNamedDarkColour(name, "WCAG2.1");
			}),
		);
	});

	test("palette matching", async ({ bench }) => {
		await bench.compare(
			bench("findNearestRGBColour (1000 colours)", () => {
				findNearestRGBColour({ R: 120, G: 45, B: 200 }, LARGE_RGB_PALETTE);
			}),
			bench("findNearestHexColour (1000 colours)", () => {
				findNearestHexColour("#7a2dc8", LARGE_HEX_PALETTE);
			}),
			bench("findNearestCSSRGBColour (200 colours)", () => {
				findNearestCSSRGBColour("rgb(120, 45, 200)", CSS_RGB_PALETTE);
			}),
			bench("findNearestNamedCSSColour", () => {
				findNearestNamedCSSColour("rebeccapurple", [
					"red",
					"green",
					"blue",
					"purple",
					"indigo",
					"violet",
				]);
			}),
			bench("findNearestColour (mixed palette)", () => {
				findNearestColour("#7a2dc8", MIXED_PALETTE);
			}),
		);
	});

	for (const standard of ["WCAG2.1", "WCAG3.0"] satisfies WCAG[]) {
		test(`darkness (${standard})`, async ({ bench }) => {
			await bench.compare(
				bench("isDarkColour (hex)", () => {
					for (const hex of HEX_COLOURS) isDarkColour(hex, standard);
				}),
				bench("isDarkColour (CSS RGB)", () => {
					for (const rgb of CSS_RGB_COLOURS) isDarkColour(rgb, standard);
				}),
				bench("isDarkColour (named)", () => {
					for (const name of [
						"black",
						"white",
						"red",
						"darkblue",
						"rebeccapurple",
						"aliceblue",
						"lightgoldenrodyellow",
						"hotpink",
					]) {
						isDarkColour(name, standard);
					}
				}),
				bench("isDarkColour (varied hex)", () => {
					for (const hex of LARGE_HEX_PALETTE) isDarkColour(hex, standard);
				}),
				bench("isDarkColour (CSS formats)", () => {
					for (const rgb of [
						"rgb(8%, 8%, 8%)",
						"rgba(78%, 78%, 78%, 80%)",
						"rgb(12 34 56)",
						"rgba(200 210 220 / 0.5)",
						"rgb(10.1, 10.2, 10.3)",
						"rgb(116.5, 116.5, 116.5)",
					]) {
						isDarkColour(rgb, standard);
					}
				}),
			);
		});
	}

	test("sorting", async ({ bench }) => {
		await bench.compare(
			bench("sortHexColours (100 colours)", () => {
				sortHexColours(HEX_COLOURS);
			}),
			bench("sortHexColours (1000 colours)", () => {
				sortHexColours(LARGE_HEX_PALETTE);
			}),
		);
	});
});
