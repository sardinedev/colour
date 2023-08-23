import test from "ava";
import { convertRGBtoCSSRGB } from "../convertRGBtoCSSRGB.js";

test("should return the CSS RGB colour seperated by spaces", ({ is }) => {
	const colour = { R: 255, G: 255, B: 255 };
	is(convertRGBtoCSSRGB(colour), "rgb(255 255 255)");
});

test("should return the CSS RGB colour with alpha seperated by spaces", ({
	is,
}) => {
	const colour = { R: 255, G: 255, B: 255, A: 0.5 };
	is(convertRGBtoCSSRGB(colour), "rgb(255 255 255 / 0.5)");
});
