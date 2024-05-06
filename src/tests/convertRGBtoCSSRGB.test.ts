import { expect, test } from "vitest";
import { convertRGBtoCSSRGB } from "../convertRGBtoCSSRGB";

test("should return the CSS RGB colour seperated by spaces", () => {
	const colour = { R: 255, G: 255, B: 255 };
	expect(convertRGBtoCSSRGB(colour)).toBe("rgb(255 255 255)");
});

test("should return the CSS RGB colour with alpha seperated by spaces", () => {
	const colour = { R: 255, G: 255, B: 255, A: 0.5 };
	expect(convertRGBtoCSSRGB(colour)).toBe("rgb(255 255 255 / 0.5)");
});
