import { expect, test } from "vitest";
import { convertRGBtoNamedCSSColour } from "./convertRGBtoNamedCSSColour";
import type { RGBColour } from "./types";

test("converts pure white to 'white'", () => {
	const colour: RGBColour = { R: 255, G: 255, B: 255 };
	expect(convertRGBtoNamedCSSColour(colour)).toBe("white");
});

test("converts pure black to 'black'", () => {
	const colour: RGBColour = { R: 0, G: 0, B: 0 };
	expect(convertRGBtoNamedCSSColour(colour)).toBe("black");
});

test("converts deeppink RGB values to 'deeppink'", () => {
	// #ff1493
	const colour: RGBColour = { R: 255, G: 20, B: 147 };
	expect(convertRGBtoNamedCSSColour(colour)).toBe("deeppink");
});

test("converts pure red to 'red'", () => {
	const colour: RGBColour = { R: 255, G: 0, B: 0 };
	expect(convertRGBtoNamedCSSColour(colour)).toBe("red");
});

test("returns undefined for an RGB colour that has no named CSS equivalent", () => {
	const colour: RGBColour = { R: 1, G: 2, B: 3 };
	expect(convertRGBtoNamedCSSColour(colour)).toBeUndefined();
});

test("returns undefined for an arbitrary mid-tone with no named equivalent", () => {
	const colour: RGBColour = { R: 123, G: 45, B: 67 };
	expect(convertRGBtoNamedCSSColour(colour)).toBeUndefined();
});
