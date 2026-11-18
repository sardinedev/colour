import { expect, test } from "vitest";
import { isCSSRGBDarkColour } from "./isCSSRGBDarkColour";
import { isHexDarkColour } from "./isHexDarkColour";

test("verify if `rgb(20, 20, 20)` is a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(20, 20, 20)")).toBe(true);
});

test("verify if `rgb(200, 200, 200)` is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(200, 200, 200)")).toBe(false);
});

test("verify if CSS RGB with percentage values (dark) is a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(8%, 8%, 8%)")).toBe(true);
});

test("verify if CSS RGB with percentage values (light) is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(78%, 78%, 78%)")).toBe(false);
});

test("verify if CSS RGBA with percentage values and alpha is evaluated correctly", () => {
	expect(isCSSRGBDarkColour("rgba(8%, 8%, 8%, 0.9)")).toBe(true);
});

test("verify if CSS RGB with mixed percentage and integer values works", () => {
	expect(isCSSRGBDarkColour("rgb(20, 8%, 20)")).toBe(true);
});

test("verify if CSS RGB with modern slash syntax works", () => {
	expect(isCSSRGBDarkColour("rgb(20 20 20 / 0.8)")).toBe(true);
});

test("isCSSRGBDarkColour: fully transparent dark colour is still considered dark (alpha ignored)", () => {
	// Alpha channel is not part of luminance calculation — only RGB channels matter
	expect(isCSSRGBDarkColour("rgba(0, 0, 0, 0)")).toBe(true);
});

test("isCSSRGBDarkColour: fully transparent light colour is still considered light (alpha ignored)", () => {
	expect(isCSSRGBDarkColour("rgba(255, 255, 255, 0)")).toBe(false);
});

test("mid grey `rgb(128, 128, 128)` is not a dark colour", () => {
	expect(isCSSRGBDarkColour("rgb(128, 128, 128)")).toBe(false);
});

test("agrees with isHexDarkColour for every grey level", () => {
	for (let v = 0; v <= 255; v++) {
		const hexChannel = v.toString(16).padStart(2, "0");
		expect(isCSSRGBDarkColour(`rgb(${v}, ${v}, ${v})`), `grey ${v}`).toBe(
			isHexDarkColour(`#${hexChannel.repeat(3)}`),
		);
	}
});

test.each(["rfv(12,23,42)", "rgb(12,23)", ""])(
	"returns false for invalid CSS RGB colour %j",
	(colour) => {
		expect(isCSSRGBDarkColour(colour)).toBe(false);
	},
);
