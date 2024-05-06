import test from "ava";
import type { HueHelper } from "../types";
import {
	bigSquare,
	deltaHue_d,
	hue_d,
	meanHue_d,
	toRadians,
} from "../util/index";

test("converts degrees to radians", ({ is }) => {
	is(toRadians(120), 2.0943951023931953);
});

test("computes a big square", ({ is }) => {
	is(bigSquare(2), 0.0001448154672685047);
});

test("computes a hue derivative at point 0,0", ({ is }) => {
	is(hue_d(0, 0), 0);
});

test("computes a hue derivative with an angle greater than 0", ({ is }) => {
	is(hue_d(5, 5), 45);
});

test("computes a hue derivative with an angle smaller than 0", ({ is }) => {
	is(hue_d(-5, -5), 225);
});

test("computes the difference between two Hue derivatives", ({ is }) => {
	const hues: HueHelper = {
		C1: 79.82,
		C2: 82.7485,
		h1_d: 271.9222,
		h2_d: 270,
	};
	is(deltaHue_d(hues), -1.9221999999999753);
});

test("computes the difference between two Hue 0 derivatives", ({ is }) => {
	const hues: HueHelper = {
		C1: 0,
		C2: 0,
		h1_d: 271.9222,
		h2_d: 270,
	};
	is(deltaHue_d(hues), 0);
});

test("computes the difference between two Hue derivatives greater than 180", ({
	is,
}) => {
	const hues: HueHelper = {
		C1: 3.7496,
		C2: 2.5,
		h1_d: 0,
		h2_d: 270,
	};
	is(deltaHue_d(hues), -90);
});

test("computes the difference between two Hue derivatives smaller than -180", ({
	is,
}) => {
	const hues: HueHelper = {
		C1: 3.7346,
		C2: 3.7346,
		h1_d: 359.9847,
		h2_d: 179.9816,
	};
	is(deltaHue_d(hues), 179.9969);
});

test("computes the mean between two Hue derivatives", ({ is }) => {
	const hues: HueHelper = {
		C1: 79.82,
		C2: 82.7485,
		h1_d: 271.9222,
		h2_d: 270,
	};
	is(meanHue_d(hues), 270.9611);
});

test("computes the mean between two Hue 0 derivatives", ({ is }) => {
	const hues: HueHelper = {
		C1: 0,
		C2: 0,
		h1_d: 271.9222,
		h2_d: 270,
	};
	is(meanHue_d(hues), 541.9222);
});

test("computes the mean between two Hue derivatives where the absolute diff is greater than 180 and the sum smaller than 360", ({
	is,
}) => {
	const hues: HueHelper = {
		C1: 3.456873841289,
		C2: 38.9743207183753,
		h1_d: 0,
		h2_d: 332.493931504869,
	};
	is(meanHue_d(hues), 346.2469657524345);
});

test("computes the mean between two Hue derivatives where the absolute diff is greater than 180 and the sum greater than 360", ({
	is,
}) => {
	const hues: HueHelper = {
		C1: 3.73461191455763,
		C2: 3.734611942673,
		h1_d: 359.984658170244,
		h2_d: 179.983123987353,
	};
	is(meanHue_d(hues), 89.98389107879848);
});
