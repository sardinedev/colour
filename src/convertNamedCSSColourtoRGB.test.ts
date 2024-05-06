import { expect, test } from "vitest";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";

test("converts named CSS colour to RGB colour", () => {
	const expectedRGB = { R: 255, G: 250, B: 250 };
	expect(convertNamedCSSColourtoRGB("snow")).toStrictEqual(expectedRGB);
});

test("returns undefined if named CSS colour doesn't exist", () => {
	const expectedRGB = undefined;
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoRGB("neve")).toBe(expectedRGB);
});
