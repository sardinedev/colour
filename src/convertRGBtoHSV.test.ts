import { expect, test } from "vitest";
import { convertRGBtoHSV } from "./convertRGBtoHSV";

test("convertRGBtoHSV: pure red", () => {
	const hsv = convertRGBtoHSV(255, 0, 0);
	expect(hsv).toEqual({ h: 0, s: 1, v: 1 });
});

test("convertRGBtoHSV: pure green", () => {
	const hsv = convertRGBtoHSV(0, 255, 0);
	expect(hsv).toEqual({ h: 120, s: 1, v: 1 });
});

test("convertRGBtoHSV: pure blue", () => {
	const hsv = convertRGBtoHSV(0, 0, 255);
	expect(hsv).toEqual({ h: 240, s: 1, v: 1 });
});

test("convertRGBtoHSV: black", () => {
	const hsv = convertRGBtoHSV(0, 0, 0);
	expect(hsv).toEqual({ h: 0, s: 0, v: 0 });
});

test("convertRGBtoHSV: white", () => {
	const hsv = convertRGBtoHSV(255, 255, 255);
	expect(hsv).toEqual({ h: 0, s: 0, v: 1 });
});

test("convertRGBtoHSV: grey", () => {
	const hsv = convertRGBtoHSV(128, 128, 128);
	expect(hsv.s).toBeCloseTo(0);
	expect(hsv.v).toBeCloseTo(0.50196, 5);
});

test("convertRGBtoHSV: yellow", () => {
	const hsv = convertRGBtoHSV(255, 255, 0);
	expect(hsv.h).toBeCloseTo(60);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});

test("convertRGBtoHSV: cyan", () => {
	const hsv = convertRGBtoHSV(0, 255, 255);
	expect(hsv.h).toBeCloseTo(180);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});

test("convertRGBtoHSV: magenta", () => {
	const hsv = convertRGBtoHSV(255, 0, 255);
	expect(hsv.h).toBeCloseTo(300);
	expect(hsv.s).toBeCloseTo(1);
	expect(hsv.v).toBeCloseTo(1);
});

test("convertRGBtoHSV: negative intermediate hue is normalised to positive degrees", () => {
	// R=255, G=0, B=100 → max=red, intermediate hue = (G-B)/delta = -100/255 → × 60 ≈ -23.5°
	// The `hue + 360` branch fires, yielding ≈ 336.47°
	const hsv = convertRGBtoHSV(255, 0, 100);
	expect(hsv.h).toBeGreaterThan(0);
	expect(hsv.h).toBeCloseTo(336.47, 1);
	expect(hsv.s).toBe(1);
	expect(hsv.v).toBe(1);
});
