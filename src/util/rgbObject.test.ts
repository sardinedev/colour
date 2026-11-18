import { expect, test } from "vitest";
import { parseRGBObject, rgbObjectForDistance } from "./rgbObject";

const VALUES = [
	-1,
	0,
	0.5,
	1,
	1.5,
	128,
	255,
	255.5,
	300,
	Number.NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	-0,
	"1",
	null,
];

const cases: unknown[] = [
	null,
	undefined,
	"#fff",
	42,
	{},
	{ R: 0, G: 0 },
	{ r: 0, g: 0, b: 0 },
	{ R: 1, G: 2, B: 3, A: undefined },
];
for (const R of VALUES) {
	cases.push({ R, G: 10, B: 20 });
	cases.push({ R: 10, G: R, B: 20, A: 0.5 });
	cases.push({ R: 10, G: 20, B: R });
	cases.push({ R: 10, G: 20, B: 30, A: R });
}

/** The values that feed the distance: -0 and +0 measure the same, and alpha is ignored. */
function distanceInputs(rgb: ReturnType<typeof parseRGBObject>) {
	if (rgb === null) return null;
	const plus = (n: number) => (n === 0 ? 0 : n);
	return [plus(rgb.R), plus(rgb.G), plus(rgb.B)];
}

test.each(cases)("agrees with parseRGBObject for %j", (value) => {
	const fast = rgbObjectForDistance(value);
	const full = parseRGBObject(value);
	// Same validity, same clamping, same channel values for measuring
	expect(fast === null).toBe(full === null);
	expect(distanceInputs(fast)).toEqual(distanceInputs(full));
});

test("returns the object itself only when it is already valid and in range", () => {
	const inRange = { R: 1, G: 2, B: 3, A: 0.5 };
	expect(rgbObjectForDistance(inRange)).toBe(inRange);
	const outOfRange = { R: 300, G: 2, B: 3 };
	expect(rgbObjectForDistance(outOfRange)).not.toBe(outOfRange);
	expect(rgbObjectForDistance(outOfRange)).toStrictEqual({
		R: 255,
		G: 2,
		B: 3,
	});
});
