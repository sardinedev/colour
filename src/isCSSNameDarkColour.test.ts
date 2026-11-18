import { expect, test } from "vitest";
import { isCSSNamedDarkColour } from "./isCSSNameDarkColour";

test("verify if `darkblue` is a dark colour", () => {
	expect(isCSSNamedDarkColour("darkblue")).toBe(true);
});

test("verify if `lightgoldenrodyellow` is a dark colour", () => {
	expect(isCSSNamedDarkColour("lightgoldenrodyellow")).toBe(false);
});

test("returns false if named colour does not exist", () => {
	// @ts-expect-error - TS would complain about this, but it's a valid test for users consuming JS
	expect(isCSSNamedDarkColour("rose")).toBe(false);
});
