import test from "ava";
import { isCSSNamedDarkColour } from "../isCSSNameDarkColour";

test("verify if `darkblue` is a dark colour", ({ is }) => {
	is(isCSSNamedDarkColour("darkblue", "WCAG2.1"), true);
});

test("verify if `lightgoldenrodyellow` is a dark colour", ({ is }) => {
	is(isCSSNamedDarkColour("lightgoldenrodyellow", "WCAG2.1"), false);
});

test("return undefined if named colour does not exist", ({ is, throws }) => {
	/* @ts-ignore-line */
	const error = throws(() => isCSSNamedDarkColour("rose", "WCAG2.1")) as Error;
	is(
		error.message,
		"rose is not a valid colour format. isCSSNamedDarkColour only accepts CSS named colours. Check more details here https://developer.mozilla.org/en-US/docs/Web/CSS/named-color",
	);
});
