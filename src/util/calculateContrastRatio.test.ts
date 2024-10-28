import { expect, it } from "vitest";
import { calculateContrastRatio } from "./calculateContrastRatio";

it("should calculate the contrast ratio between two luminances", () => {
	expect(calculateContrastRatio(0.05780543019106723, 0.16288822420427432)).toBe(
		1.974,
	);
});
