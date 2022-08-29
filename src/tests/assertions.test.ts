import test from "ava";
import { isCSSRGBColour, isHexColour } from "../assertions.js";

test("assert true if string is in the CSS RGB format", ({ is }) => {
  is(isCSSRGBColour("rgb(12, 23, 111)"), true);
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
