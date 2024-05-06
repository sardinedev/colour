import test from "ava";
import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "../assertions";

test("assert true if string is in the CSS RGB format with commas", ({ is }) => {
	is(isCSSRGBColour("rgb(12, 23, 111)"), true);
});

test("assert true if string is in the CSS RGB format with commas and a alpha channel", ({
	is,
}) => {
	is(isCSSRGBColour("rgba(12, 23, 111, 0.4)"), true);
});

test("assert true if string is in the CSS RGB format with commas and a percentage alpha channel", ({
	is,
}) => {
	is(isCSSRGBColour("rgba(12, 23, 111, 40%)"), true);
});

test("assert true if string is in the CSS RGB format with spaces", ({ is }) => {
	is(isCSSRGBColour("rgb(12 23 111)"), true);
});

test("assert true if string is in the CSS RGB format with spaces and alpha", ({
	is,
}) => {
	is(isCSSRGBColour("rgb(12 23 111 / 0.4)"), true);
});

test("assert true if string is in the CSS RGBA format with spaces and a percentage alpha channel", ({
	is,
}) => {
	is(isCSSRGBColour("rgba(12 23 111 / 40%)"), true);
});

test("assert false if string is not in the CSS RGB format", ({ is }) => {
	is(isCSSRGBColour("zzz( 23, 111, 87)"), false);
});

test.skip("assert false if string doesn't have 3 colour values", ({ is }) => {
	is(isCSSRGBColour("rgb( 23, 111)"), false);
});

test("assert true if string is a short hexadecimal colour", ({ is }) => {
	is(isHexColour("#333"), true);
});

test("assert true if string is a six digital hexadecimal colour", ({ is }) => {
	is(isHexColour("#333000"), true);
});

test("assert true if string is a short hexadecimal colour with alpha", ({
	is,
}) => {
	is(isHexColour("#333f"), true);
});

test("assert true if string is an hexadecimal colour with alpha", ({ is }) => {
	is(isHexColour("#333000ff"), true);
});

test("assert false if string is not a valid hexadecimal colour", ({ is }) => {
	is(isHexColour("#333HH0ff"), false);
});

test("assert true if string is a valid named CSS colour", ({ is }) => {
	is(isNamedCSSColour("snow"), true);
});

test("assert false if string is not a valid named CSS colour", ({ is }) => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	is(isNamedCSSColour("neve"), false);
});
