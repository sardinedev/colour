import { expect, test } from "vitest";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { isDarkColour } from "./isDarkColour";
import type { RGBColour, WCAG } from "./types";

function referenceLuminance({ R, G, B }: RGBColour, standard: WCAG) {
	const linear = (channel: number) => {
		const ratio = channel / 255;
		return ratio > (standard === "WCAG2.1" ? 0.03928 : 0.04045)
			? ((ratio + 0.055) / 1.055) ** 2.4
			: ratio / 12.92;
	};
	return 0.2126 * linear(R) + 0.7152 * linear(G) + 0.0722 * linear(B);
}

for (const standard of ["WCAG2.1", "WCAG3.0"] satisfies WCAG[]) {
	test(`preserves hex darkness boundaries and alpha formats (${standard})`, () => {
		for (let channel = 0; channel <= 255; channel++) {
			const pair = channel.toString(16).padStart(2, "0");
			const hex = `#${pair.repeat(3)}`;
			const luminance =
				referenceLuminance({ R: channel, G: channel, B: channel }, standard) +
				0.05;
			const expected = 1.05 / luminance > luminance / 0.05;
			expect(isDarkColour(hex, standard)).toBe(expected);
			expect(isDarkColour(`${hex}00`, standard)).toBe(expected);
		}
		for (const hex of ["#000", "#fff", "#777", "#888", "#0000", "#fff0"]) {
			const rgb = convertHextoRGB(hex);
			if (!rgb) throw new Error("Invalid test fixture");
			const luminance = referenceLuminance(rgb, standard) + 0.05;
			expect(isDarkColour(hex, standard)).toBe(
				1.05 / luminance > luminance / 0.05,
			);
		}
	});

	test(`preserves CSS RGB darkness and fractional channels (${standard})`, () => {
		for (const colour of [
			"rgb(10.01, 10.1, 10.4)",
			"rgb(116, 116, 116)",
			"rgb(117, 117, 117)",
			"rgb(131.5, 131.5, 131.5)",
			"rgb(132, 132, 132)",
			"rgb(8%, 8%, 8%)",
			"rgba(78%, 78%, 78%, 80%)",
			"rgb(12 34 56)",
			"rgba(200 210 220 / 0)",
		]) {
			const luminance = referenceLuminance(
				convertCSSRGBtoRGB(colour),
				standard,
			);
			expect(isDarkColour(colour, standard)).toBe(
				1.05 / luminance > luminance / 0.05,
			);
		}
	});

	test(`preserves named colours and invalid-input behaviour (${standard})`, () => {
		expect(isDarkColour("darkblue", standard)).toBe(true);
		expect(isDarkColour("aliceblue", standard)).toBe(false);
		for (const colour of ["#ggg", "#12", "#12345", "#123456789"]) {
			expect(isDarkColour(colour, standard)).toBe(false);
		}
		for (const colour of ["unknown-colour", "rgb(nope)", ""]) {
			expect(() => isDarkColour(colour, standard)).toThrow(
				`${colour} is not a valid colour format.`,
			);
		}
	});
}

test("should return true for `darkblue`", () => {
	expect(isDarkColour("darkblue", "WCAG2.1")).toBe(true);
});

test("should return false for `lightgoldenrodyellow`", () => {
	expect(isDarkColour("lightgoldenrodyellow", "WCAG2.1")).toBe(false);
});

test("should return true for `rgb(20, 20, 20)`", () => {
	expect(isDarkColour("rgb(20, 20, 20)", "WCAG2.1")).toBe(true);
});

test("should return false for `rgb(200, 200, 200)`", () => {
	expect(isDarkColour("rgb(200, 200, 200)", "WCAG2.1")).toBe(false);
});

test("should return false for #BED colour", () => {
	expect(isDarkColour("#BED", "WCAG2.1")).toBe(false);
});

test("should return true for #666666 colour", () => {
	expect(isDarkColour("#666666", "WCAG2.1")).toBe(true);
});

test("throws an error if not passing a valid CSS RGB format", () => {
	const rgb = "rfv(12,23,42)";
	expect(() => isDarkColour(rgb, "WCAG2.1")).toThrow(
		"rfv(12,23,42) is not a valid colour format. isDarkColour accepts CSS RGB formats, ie rgb(0,0,0), rgba(255, 255, 255, 0.4), rgb(50%, 25%, 100%), and rgba(50%, 25%, 100%, 80%), hexadecimal and CSS named colours.",
	);
});

test("should return true for CSS RGB with percentage values (dark)", () => {
	expect(isDarkColour("rgb(8%, 8%, 8%)", "WCAG2.1")).toBe(true);
});

test("should return false for CSS RGB with percentage values (light)", () => {
	expect(isDarkColour("rgb(78%, 78%, 78%)", "WCAG2.1")).toBe(false);
});

test("should return true for CSS RGBA with percentage values", () => {
	expect(isDarkColour("rgba(8%, 8%, 8%, 0.9)", "WCAG2.1")).toBe(true);
});

test("should return true for CSS RGB with mixed percentage and integer values", () => {
	expect(isDarkColour("rgb(20, 8%, 20)", "WCAG2.1")).toBe(true);
});

test("isDarkColour: fully transparent dark RGBA is still considered dark (alpha ignored)", () => {
	// Alpha channel is not part of luminance calculation — only RGB channels matter
	expect(isDarkColour("rgba(0, 0, 0, 0)", "WCAG2.1")).toBe(true);
});

test("isDarkColour: fully transparent light RGBA is still considered light (alpha ignored)", () => {
	expect(isDarkColour("rgba(255, 255, 255, 0)", "WCAG2.1")).toBe(false);
});

test("isDarkColour: 8-digit hex with zero alpha on a dark colour is still dark (alpha ignored)", () => {
	expect(isDarkColour("#00000000", "WCAG2.1")).toBe(true);
});

test("isDarkColour: 8-digit hex with zero alpha on a light colour is still light (alpha ignored)", () => {
	expect(isDarkColour("#ffffff00", "WCAG2.1")).toBe(false);
});
