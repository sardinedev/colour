import { expect, test } from "vitest";
import { convertRGBtoHSV } from "./convertRGBtoHSV";

test("converts pure red", () => {
	const hsv = convertRGBtoHSV(255, 0, 0);
	expect(hsv).toEqual({ h: 0, s: 1, v: 1 });
});

test("converts pure green", () => {
	const hsv = convertRGBtoHSV(0, 255, 0);
	expect(hsv).toEqual({ h: 120, s: 1, v: 1 });
});

test("converts pure blue", () => {
	const hsv = convertRGBtoHSV(0, 0, 255);
	expect(hsv).toEqual({ h: 240, s: 1, v: 1 });
});

test("converts black", () => {
	const hsv = convertRGBtoHSV(0, 0, 0);
	expect(hsv).toEqual({ h: 0, s: 0, v: 0 });
});

test("converts white", () => {
	const hsv = convertRGBtoHSV(255, 255, 255);
	expect(hsv).toEqual({ h: 0, s: 0, v: 1 });
});

test("converts grey", () => {
	const hsv = convertRGBtoHSV(128, 128, 128);
	expect(hsv.s).toBeCloseTo(0);
	expect(hsv.v).toBeCloseTo(0.50196, 5);
});

test("converts yellow", () => {
	const hsv = convertRGBtoHSV(255, 255, 0);
	expect(hsv.h).toBeCloseTo(60);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});

test("converts cyan", () => {
	const hsv = convertRGBtoHSV(0, 255, 255);
	expect(hsv.h).toBeCloseTo(180);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});

test("converts magenta", () => {
	const hsv = convertRGBtoHSV(255, 0, 255);
	expect(hsv.h).toBeCloseTo(300);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});
