import { expect, test } from "vitest";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";

test("converts named CSS colour to RGB colour", () => {
	const expectedRGB = { R: 255, G: 250, B: 250 };
	expect(convertNamedCSSColourtoRGB("snow")).toStrictEqual(expectedRGB);
});

test("returns null if named CSS colour doesn't exist", () => {
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoRGB("neve")).toBeNull();
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoRGB("Red")).toBeNull();
});
