import { expect, test } from "vitest";
import { convertNamedCSSColourtoHex } from "../convertNamedCSSColourtoHex";

test("converts named CSS colour to hexadecimal colour", () => {
	const expectedHex = "#fffafa";
	expect(convertNamedCSSColourtoHex("snow")).toBe(expectedHex);
});

test("returns undefined if named CSS colour doesn't exist", () => {
	const expectedHex = undefined;
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoHex("neve")).toBe(expectedHex);
});
