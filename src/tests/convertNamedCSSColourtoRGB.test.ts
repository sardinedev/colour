import test from "ava";
import { convertNamedCSSColourtoRGB } from "../convertNamedCSSColourtoRGB";

test("converts named CSS colour to RGB colour", ({ deepEqual }) => {
	const expectedRGB = { R: 255, G: 250, B: 250 };
	deepEqual(convertNamedCSSColourtoRGB("snow"), expectedRGB);
});

test("returns undefined if named CSS colour doesn't exist", ({ is }) => {
	const expectedRGB = undefined;
	/*@ts-expect-error*/
	is(convertNamedCSSColourtoRGB("neve"), expectedRGB);
});
