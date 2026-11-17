import { expect, test } from "vitest";
import { convertRGBtoCSSRGB } from "./convertRGBtoCSSRGB";

test("should return the CSS RGB colour seperated by spaces", () => {
	const colour = { R: 255, G: 255, B: 255 };
	expect(convertRGBtoCSSRGB(colour)).toBe("rgb(255 255 255)");
});

test("should return the CSS RGB colour with alpha seperated by spaces", () => {
	const colour = { R: 255, G: 255, B: 255, A: 0.5 };
	expect(convertRGBtoCSSRGB(colour)).toBe("rgb(255 255 255 / 0.5)");
});

test.each([
	[{ R: 255, G: 0, B: 0, A: 0 }, "rgb(255 0 0 / 0)"],
	[{ R: 255, G: 0, B: 0, A: 1 }, "rgb(255 0 0 / 1)"],
	[{ R: 127.5, G: 0.25, B: 255 }, "rgb(127.5 0.25 255)"],
])("serializes %o as CSS RGB", (colour, expected) => {
	expect(convertRGBtoCSSRGB(colour)).toBe(expected);
});
