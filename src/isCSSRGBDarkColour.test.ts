import { expect, test } from "vitest";
import { isCSSRGBDarkColour } from "./isCSSRGBDarkColour";

test("verify if `rgb(20, 20, 20)` is a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(20, 20, 20)", "WCAG2.1")).toBe(true);
});

test("verify if `rgb(200, 200, 200)` is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(200, 200, 200)", "WCAG2.1")).toBe(false);
});

test("verify if CSS RGB with percentage values (dark) is a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(8%, 8%, 8%)", "WCAG2.1")).toBe(true);
});

test("verify if CSS RGB with percentage values (light) is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(78%, 78%, 78%)", "WCAG2.1")).toBe(false);
});

test("verify if CSS RGBA with percentage values and alpha is evaluated correctly", () => {
	expect(isCSSRGBDarkColour("rgba(8%, 8%, 8%, 0.9)", "WCAG2.1")).toBe(true);
});

test("verify if CSS RGB with mixed percentage and integer values works", () => {
	expect(isCSSRGBDarkColour("rgb(20, 8%, 20)", "WCAG2.1")).toBe(true);
});

test("verify if CSS RGB with modern slash syntax works", () => {
	expect(isCSSRGBDarkColour("rgb(20 20 20 / 0.8)", "WCAG2.1")).toBe(true);
});
