import test from "ava";
import { isCSSNamedDarkColour } from "../isCSSNameDarkColour.js";

test("verify if `darkblue` is a dark colour", ({ is }) => {
  is(isCSSNamedDarkColour("darkblue", "WCAG2.1"), true);
});

test("verify if `lightgoldenrodyellow` is a dark colour", ({ is }) => {
  is(isCSSNamedDarkColour("lightgoldenrodyellow", "WCAG2.1"), false);
});

test("return undefined if named colour does not exist", ({ is }) => {
  /* @ts-ignore-line */
  is(isCSSNamedDarkColour("rose", "WCAG2.1"), undefined);
});
