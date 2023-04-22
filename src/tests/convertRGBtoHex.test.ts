import test from "ava";
import { convertRGBtoHex } from "../convertRGBtoHex.js";
import type { RGBColour } from "../types";

test("converts RGB format to hexadecimal colour", ({ is }) => {
	const expectedHex = "#ffffff";
	const RGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
	};
	is(convertRGBtoHex(RGB), expectedHex);
});

test("converts RGBA format to hexadecimal colour with alpha channel", ({
	is,
}) => {
	const expectedHex = "#ffffff80";
	const RGB: RGBColour = {
		R: 255,
		G: 255,
		B: 255,
		A: 0.5,
	};
	is(convertRGBtoHex(RGB), expectedHex);
});
