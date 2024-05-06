import test from "ava";
import { isDarkColour } from "../isDarkColour";

test("should return true for `darkblue`", ({ is }) => {
	is(isDarkColour("darkblue", "WCAG2.1"), true);
});

test("should return false for `lightgoldenrodyellow`", ({ is }) => {
	is(isDarkColour("lightgoldenrodyellow", "WCAG2.1"), false);
});

test("should return true for `rgb(20, 20, 20)`", ({ is }) => {
	is(isDarkColour("rgb(20, 20, 20)", "WCAG2.1"), true);
});

test("should return false for `rgb(200, 200, 200)`", ({ is }) => {
	is(isDarkColour("rgb(200, 200, 200)", "WCAG2.1"), false);
});

test("should return false for #BED colour", ({ is }) => {
	is(isDarkColour("#BED", "WCAG2.1"), false);
});

test("should return true for #666666 colour", ({ is }) => {
	is(isDarkColour("#666666", "WCAG2.1"), true);
});

test("throws an error if not passing a valid CSS RGB format", ({
	is,
	throws,
}) => {
	const rgb = "rfv(12,23,42)";
	const error = throws(() => isDarkColour(rgb, "WCAG2.1")) as Error;
	is(
		error.message,
		"rfv(12,23,42) is not a valid colour format. isDarkColour accepts CSS RGB formats, ie rgb(0,0,0) and rgba(255, 255, 255, 0.4), hexadecimal and CSS named colours.",
	);
});
