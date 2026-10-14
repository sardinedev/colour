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
} from "../src/index";
import { CSS_RGB_COLOURS, HEX_COLOURS, RGB_COLOURS } from "./fixtures";

const XYZ_COLOURS = RGB_COLOURS.map((c) => convertRGBtoXYZ(c));
const NAMED_HEX_COLOURS = [
	"#663399",
	"#f0f8ff",
	"#ffffff",
	"#000000",
	"#ff6347",
];

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
});
