import test from "ava";
import { convertCSSRGBtoHex } from "../convertCSSRGBtoHex.js";

test("converts CSS RGB format to hexadecimal colour", ({ is }) => {
	const expectedHex = "#ffffff";
	const RGB = "rgb(255,255,255)";
	is(convertCSSRGBtoHex(RGB), expectedHex);
});

test("converts CSS RGBA format to hexadecimal colour with alpha channel", ({
	is,
}) => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255,255,255,0.5)";
	is(convertCSSRGBtoHex(RGBA), expectedHex);
});

test("converts CSS RGBA format to hexadecimal colour with short alpha channel", ({
	is,
}) => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255,255,255,.5)";
	is(convertCSSRGBtoHex(RGBA), expectedHex);
});

test("converts CSS RGB format to hexadecimal colour but clamps max channel value at 255", ({
	is,
}) => {
	const expectedHex = "#ffffff";
	const RGBA = "rgba(300,500,900)";
	is(convertCSSRGBtoHex(RGBA), expectedHex);
});

test("converts CSS RGB format to hexadecimal colour but clamps min channel value at 0", ({
	is,
}) => {
	const expectedHex = "#000000";
	const RGB = "rgb(-300,-500,-900)";
	is(convertCSSRGBtoHex(RGB), expectedHex);
});

test("converts CSS RGB with space separated values to hexadecimal colour", ({
	is,
}) => {
	const expectedHex = "#ffffff";
	const RGB = "rgb(255 255 255)";
	is(convertCSSRGBtoHex(RGB), expectedHex);
});

test("converts CSS RGBA with space separated values and forward slash for the alpha channel to hexadecimal colour", ({
	is,
}) => {
	const expectedHex = "#ffffff80";
	const RGBA = "rgba(255 255 255 / 0.5)";
	is(convertCSSRGBtoHex(RGBA), expectedHex);
});

test("throws an error if not passing a valid CSS RGB format", ({
	is,
	throws,
}) => {
	const rgb = "rfv(12,23,42)";
	const error = throws(() => convertCSSRGBtoHex(rgb)) as Error;
	is(
		error.message,
		"convertCSSRGBtoHex expects a valid CSS RGB string but got rfv(12,23,42)",
	);
});
