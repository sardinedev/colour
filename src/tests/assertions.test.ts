import { expect, test } from "vitest";
import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "../assertions";

test("assert true if string is in the CSS RGB format with commas", () => {
	expect(isCSSRGBColour("rgb(12, 23, 111)")).toBe(true);
});

test("assert true if string is in the CSS RGB format with commas and a alpha channel", () => {
	expect(isCSSRGBColour("rgba(12, 23, 111, 0.4)")).toBe(true);
});

test("assert true if string is in the CSS RGB format with commas and a percentage alpha channel", () => {
	expect(isCSSRGBColour("rgba(12, 23, 111, 40%)")).toBe(true);
});

test("assert true if string is in the CSS RGB format with spaces", () => {
	expect(isCSSRGBColour("rgb(12 23 111)")).toBe(true);
});

test("assert true if string is in the CSS RGB format with spaces and alpha", () => {
	expect(isCSSRGBColour("rgb(12 23 111 / 0.4)")).toBe(true);
});

test("assert true if string is in the CSS RGBA format with spaces and a percentage alpha channel", () => {
	expect(isCSSRGBColour("rgba(12 23 111 / 40%)")).toBe(true);
});

test("assert false if string is not in the CSS RGB format", () => {
	expect(isCSSRGBColour("zzz( 23, 111, 87)")).toBe(false);
});

test.skip("assert false if string doesn't have 3 colour values", () => {
	expect(isCSSRGBColour("rgb( 23, 111)")).toBe(false);
});

test("assert true if string is a short hexadecimal colour", () => {
	expect(isHexColour("#333")).toBe(true);
});

test("assert true if string is a six digital hexadecimal colour", () => {
	expect(isHexColour("#333000")).toBe(true);
});

test("assert true if string is a short hexadecimal colour with alpha", () => {
	expect(isHexColour("#333f")).toBe(true);
});

test("assert true if string is an hexadecimal colour with alpha", () => {
	expect(isHexColour("#333000ff")).toBe(true);
});

test("assert false if string is not a valid hexadecimal colour", () => {
	expect(isHexColour("#333HH0ff")).toBe(false);
});

test("assert true if string is a valid named CSS colour", () => {
	expect(isNamedCSSColour("snow")).toBe(true);
});

test("assert false if string is not a valid named CSS colour", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(isNamedCSSColour("neve")).toBe(false);
});
