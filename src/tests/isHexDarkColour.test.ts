import test from "ava";
import { isHexDarkColour } from "../isHexDarkColour.js";

test("should return false for #BED colour", ({ is }) => {
  is(isHexDarkColour("#BED", "WCAG2.1"), false);
});

test("should return true for #666666 colour", ({ is }) => {
  is(isHexDarkColour("#666666", "WCAG2.1"), true);
});
