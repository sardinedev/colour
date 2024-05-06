import test from "ava";
import { getSRGBLuminanceFromHex } from "../getSRGBLuminanceFromHex";

test("should return the luminance of a hex colour", ({ is }) => {
	is(getSRGBLuminanceFromHex("#444"), 0.05780543019106723);
});

test("should return the luminance of an 8-digit hex colour", ({ is }) => {
	is(getSRGBLuminanceFromHex("#6564CDB3"), 0.16288822420427432);
});

test("should return the luminance of an 4-digit hex colour", ({ is }) => {
	is(getSRGBLuminanceFromHex("#0f08"), 0.7152);
});
