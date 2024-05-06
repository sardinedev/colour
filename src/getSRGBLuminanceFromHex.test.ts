import { expect, test } from "vitest";
import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";

test("should return the luminance of a hex colour", () => {
	expect(getSRGBLuminanceFromHex("#444")).toBe(0.05780543019106723);
});

test("should return the luminance of an 8-digit hex colour", () => {
	expect(getSRGBLuminanceFromHex("#6564CDB3")).toBe(0.16288822420427432);
});

test("should return the luminance of an 4-digit hex colour", () => {
	expect(getSRGBLuminanceFromHex("#0f08")).toBe(0.7152);
});
