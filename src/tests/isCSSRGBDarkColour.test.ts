import test from "ava";
import { isCSSRGBDarkColour } from "../isCSSRGBDarkColour";

test("verify if `rgb(20, 20, 20)` is a dark colour", ({ is }) => {
	is(isCSSRGBDarkColour("rgb(20, 20, 20)", "WCAG2.1"), true);
});

test("verify if `rgb(200, 200, 200)` is not a dark colour", ({ is }) => {
	is(isCSSRGBDarkColour("rgb(200, 200, 200)", "WCAG2.1"), false);
});
