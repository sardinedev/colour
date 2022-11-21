import test from "ava";
import { convertNamedCSSColourtoHex } from "../convertNamedCSSColourtoHex.js";

test("converts named CSS colour to hexadecimal colour", ({ is }) => {
  const expectedHex = "#fffafa";
  is(convertNamedCSSColourtoHex("snow"), expectedHex);
});

test("returns undefined if named CSS colour doesn't exist", ({ is }) => {
  const expectedHex = undefined;
  /*@ts-expect-error*/
  is(convertNamedCSSColourtoHex("neve"), expectedHex);
});
