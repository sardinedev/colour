import { expect, test } from "vitest";
import type { HueHelper } from "../types";
import { bigSquare, deltaHue_d, hue_d, meanHue_d, toRadians } from "./index";

test("converts degrees to radians", () => {
	expect(toRadians(120)).toBe(2.0943951023931953);
});

test("computes a big square", () => {
	expect(bigSquare(2)).toBe(0.0001448154672685047);
});

test("computes a hue derivative at point 0,0", () => {
	expect(hue_d(0, 0)).toBe(0);
});

test("computes a hue derivative with an angle greater than 0", () => {
	expect(hue_d(5, 5)).toBe(45);
});

test("computes a hue derivative with an angle smaller than 0", () => {
	expect(hue_d(-5, -5)).toBe(225);
});

test("computes the difference between two Hue derivatives", () => {
	const hues: HueHelper = {
		C1: 79.82,
		C2: 82.7485,
		h1_d: 271.9222,
		h2_d: 270,
	};
	expect(deltaHue_d(hues)).toBe(-1.9221999999999753);
});

test("computes the difference between two Hue 0 derivatives", () => {
	const hues: HueHelper = {
		C1: 0,
		C2: 0,
		h1_d: 271.9222,
		h2_d: 270,
	};
	expect(deltaHue_d(hues)).toBe(0);
});

test("computes the difference between two Hue derivatives greater than 180", () => {
	const hues: HueHelper = {
		C1: 3.7496,
		C2: 2.5,
		h1_d: 0,
		h2_d: 270,
	};
	expect(deltaHue_d(hues)).toBe(-90);
});

test("computes the difference between two Hue derivatives smaller than -180", () => {
	const hues: HueHelper = {
		C1: 3.7346,
		C2: 3.7346,
		h1_d: 359.9847,
		h2_d: 179.9816,
	};
	expect(deltaHue_d(hues)).toBe(179.9969);
});

test("computes the mean between two Hue derivatives", () => {
	const hues: HueHelper = {
		C1: 79.82,
		C2: 82.7485,
		h1_d: 271.9222,
		h2_d: 270,
	};
	expect(meanHue_d(hues)).toBe(270.9611);
});

test("computes the mean between two Hue 0 derivatives", () => {
	const hues: HueHelper = {
		C1: 0,
		C2: 0,
		h1_d: 271.9222,
		h2_d: 270,
	};
	expect(meanHue_d(hues)).toBe(541.9222);
});

test("computes the mean between two Hue derivatives where the absolute diff is greater than 180 and the sum smaller than 360", () => {
	const hues: HueHelper = {
		C1: 3.456873841289,
		C2: 38.9743207183753,
		h1_d: 0,
		h2_d: 332.493931504869,
	};
	expect(meanHue_d(hues)).toBe(346.2469657524345);
});

test("computes the mean between two Hue derivatives where the absolute diff is greater than 180 and the sum greater than 360", () => {
	const hues: HueHelper = {
		C1: 3.73461191455763,
		C2: 3.734611942673,
		h1_d: 359.984658170244,
		h2_d: 179.983123987353,
	};
	expect(meanHue_d(hues)).toBe(89.98389107879848);
});
