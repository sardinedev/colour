import { assert, expect, test } from "vitest";
import { isCSSNamedDarkColour } from "./isCSSNameDarkColour";

test("verify if `darkblue` is a dark colour", () => {
	expect(isCSSNamedDarkColour("darkblue", "WCAG2.1")).toBe(true);
});

test("verify if `lightgoldenrodyellow` is a dark colour", () => {
	expect(isCSSNamedDarkColour("lightgoldenrodyellow", "WCAG2.1")).toBe(false);
});

test("return undefined if named colour does not exist", () => {
	const error = assert.throws(() =>
		/* @ts-ignore-line */
		isCSSNamedDarkColour("rose", "WCAG2.1"),
	) as unknown as Error;
	expect(
		error.message,
		"rose is not a valid colour format. isCSSNamedDarkColour only accepts CSS named colours. Check more details here https://developer.mozilla.org/en-US/docs/Web/CSS/named-color",
	);
});
