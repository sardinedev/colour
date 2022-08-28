import test from "ava";
import { isCSSRGBColour } from "../assertions.js";

test("assert true if string is in the CSS RGB format", ({ is }) => {
  is(isCSSRGBColour("rgb(12, 23, 111)"), true);
});

test("assert false if string is not in the CSS RGB format", ({ is }) => {
  is(isCSSRGBColour("zzz( 23, 111, 87)"), false);
});

test.skip("assert false if string doesn't have 3 colour values", ({ is }) => {
  is(isCSSRGBColour("rgb( 23, 111)"), false);
});
