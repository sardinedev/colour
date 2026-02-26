import { expect, test } from "vitest";
import { isCSSNamedDarkColour } from "./isCSSNameDarkColour";

test("verify if `darkblue` is a dark colour", () => {
	expect(isCSSNamedDarkColour("darkblue", "WCAG2.1")).toBe(true);
});

test("verify if `lightgoldenrodyellow` is a dark colour", () => {
	expect(isCSSNamedDarkColour("lightgoldenrodyellow", "WCAG2.1")).toBe(false);
});

test("return undefined if named colour does not exist", () => {
	expect(() =>
		// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
		isCSSNamedDarkColour("rose", "WCAG2.1"),
	).toThrow(
		"rose is not a valid colour format. isCSSNamedDarkColour only accepts CSS named colours. See https://developer.mozilla.org/en-US/docs/Web/CSS/named-color",
	);
});
