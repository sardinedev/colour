import { expect, test } from "vitest";
import { convertNamedCSSColourtoHex } from "./convertNamedCSSColourtoHex";

test("converts named CSS colour to hexadecimal colour", () => {
	const expectedHex = "#fffafa";
	expect(convertNamedCSSColourtoHex("snow")).toBe(expectedHex);
});

test("returns null if named CSS colour doesn't exist", () => {
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoHex("neve")).toBeNull();
	/*@ts-expect-error*/
	expect(convertNamedCSSColourtoHex("Red")).toBeNull();
});
