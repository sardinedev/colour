import { describe, test } from "vitest";
import {
	convertCSSRGBtoHex,
	convertCSSRGBtoRGB,
	convertHextoCSSRGB,
	convertHextoNamedCSSColour,
	convertHextoRGB,
	convertNamedCSSColourtoHex,
	convertNamedCSSColourtoRGB,
	convertRGBtoCSSRGB,
	convertRGBtoHex,
	convertRGBtoLab,
	convertRGBtoNamedCSSColour,
	convertRGBtoXYZ,
	convertXYZtoLab,
	isCSSRGBColour,
	isHexColour,
	isNamedCSSColour,
} from "../src/index";
import type { NamedCSSColour } from "../src/types";
import {
	CSS_RGB_COLOURS,
	HEX_COLOURS,
	INVALID_COLOURS,
	NAMED_COLOURS,
	RGB_COLOURS,
} from "./fixtures";

const XYZ_COLOURS = RGB_COLOURS.map((c) => convertRGBtoXYZ(c));
const NAMED_HEX_COLOURS = [
	"#663399",
	"#f0f8ff",
	"#ffffff",
	"#000000",
	"#ff6347",
];
const HEX_INPUTS = [
	...HEX_COLOURS,
	"#fff",
	"#ffff",
	"#ff000080",
	...INVALID_COLOURS,
];
const CSS_RGB_INPUTS = [
	...CSS_RGB_COLOURS,
	"rgba(12, 23, 111, 0.4)",
	"rgb(12 23 111 / 40%)",
	"rgb(50%, 25%, 100%)",
	...INVALID_COLOURS,
];
const NAMED_INPUTS = [...NAMED_COLOURS, ...INVALID_COLOURS] as NamedCSSColour[];

describe("conversions", () => {
	test("hex", async ({ bench }) => {
		await bench.compare(
			bench("convertHextoRGB", () => {
				for (const hex of HEX_COLOURS) convertHextoRGB(hex);
			}),
			bench("convertHextoCSSRGB", () => {
				for (const hex of HEX_COLOURS) convertHextoCSSRGB(hex);
			}),
			bench("convertHextoNamedCSSColour", () => {
				for (const hex of NAMED_HEX_COLOURS) convertHextoNamedCSSColour(hex);
			}),
		);
	});

	test("RGB", async ({ bench }) => {
		await bench.compare(
			bench("convertRGBtoHex", () => {
				for (const rgb of RGB_COLOURS) convertRGBtoHex(rgb);
			}),
			bench("convertRGBtoCSSRGB", () => {
				for (const rgb of RGB_COLOURS) convertRGBtoCSSRGB(rgb);
			}),
			bench("convertRGBtoXYZ", () => {
				for (const rgb of RGB_COLOURS) convertRGBtoXYZ(rgb);
			}),
			bench("convertRGBtoLab", () => {
				for (const rgb of RGB_COLOURS) convertRGBtoLab(rgb);
			}),
			bench("convertXYZtoLab", () => {
				for (const xyz of XYZ_COLOURS) convertXYZtoLab(xyz);
			}),
			bench("convertRGBtoNamedCSSColour", () => {
				for (const rgb of RGB_COLOURS.slice(0, 10)) {
					convertRGBtoNamedCSSColour(rgb);
				}
			}),
		);
	});

	test("CSS", async ({ bench }) => {
		await bench.compare(
			bench("convertCSSRGBtoRGB", () => {
				for (const css of CSS_RGB_COLOURS) convertCSSRGBtoRGB(css);
			}),
			bench("convertCSSRGBtoHex", () => {
				for (const css of CSS_RGB_COLOURS) convertCSSRGBtoHex(css);
			}),
			bench("convertNamedCSSColourtoHex", () => {
				convertNamedCSSColourtoHex("rebeccapurple");
				convertNamedCSSColourtoHex("aliceblue");
				convertNamedCSSColourtoHex("yellowgreen");
			}),
			bench("convertNamedCSSColourtoRGB", () => {
				convertNamedCSSColourtoRGB("rebeccapurple");
				convertNamedCSSColourtoRGB("aliceblue");
				convertNamedCSSColourtoRGB("yellowgreen");
			}),
		);
	});

	test("validation", async ({ bench }) => {
		await bench.compare(
			bench("isHexColour", () => {
				for (const input of HEX_INPUTS) isHexColour(input);
			}),
			bench("isCSSRGBColour", () => {
				for (const input of CSS_RGB_INPUTS) isCSSRGBColour(input);
			}),
			bench("isNamedCSSColour", () => {
				for (const input of NAMED_INPUTS) isNamedCSSColour(input);
			}),
		);
	});
});
