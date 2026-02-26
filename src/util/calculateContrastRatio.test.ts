import { expect, it } from "vitest";
import { calculateContrastRatio } from "./calculateContrastRatio";

it("should calculate the contrast ratio between two luminances", () => {
	expect(calculateContrastRatio(0.05780543019106723, 0.16288822420427432)).toBe(
		1.974,
	);
});

it("returns 1 for two identical luminances", () => {
	expect(calculateContrastRatio(0.5, 0.5)).toBe(1);
	expect(calculateContrastRatio(0, 0)).toBe(1);
});

it("returns 21 for maximum contrast (black vs white)", () => {
	expect(calculateContrastRatio(0, 1)).toBe(21);
});

it("is symmetric — swapping arguments returns the same ratio", () => {
	const a = 0.05780543019106723;
	const b = 0.16288822420427432;
	expect(calculateContrastRatio(a, b)).toBe(calculateContrastRatio(b, a));
});
