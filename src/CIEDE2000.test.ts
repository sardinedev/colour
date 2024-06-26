import { expect, test } from "vitest";
import { ciede2000 } from "./CIEDE2000";
import type { LabColour } from "./types";

/*
 * Test data provided by Gaurav Sharma
 * http://www2.ece.rochester.edu/~gsharma/ciede2000/dataNprograms/ciede2000testdata.txt
 */

test("mesures colour difference #1", () => {
	const colour1: LabColour = {
		L: 50.0,
		a: 2.6772,
		b: -79.7751,
	};

	const colour2: LabColour = {
		L: 50.0,
		a: 0.0,
		b: -82.7485,
	};
	expect(ciede2000(colour1, colour2)).toBe(2.0424596801565738);
});

test("mesures colour difference #2", () => {
	const colour1: LabColour = {
		L: 60.2574,
		a: -34.0099,
		b: 36.2677,
	};

	const colour2: LabColour = {
		L: 60.4626,
		a: -34.1751,
		b: 39.4387,
	};
	expect(ciede2000(colour1, colour2)).toBe(1.2644200135991919);
});

test("mesures colour difference #3", () => {
	const colour1: LabColour = {
		L: 50,
		a: 2.5,
		b: 0,
	};

	const colour2: LabColour = {
		L: 58,
		a: 24,
		b: 15,
	};
	expect(ciede2000(colour1, colour2)).toBe(19.453521433392584);
});

test("mesures colour difference #4", () => {
	const colour1: LabColour = {
		L: 50,
		a: 2.5,
		b: 0,
	};

	const colour2: LabColour = {
		L: 50,
		a: 3.25917204763466,
		b: 0.334992094209014,
	};
	expect(ciede2000(colour1, colour2)).toBe(0.9999999764765461);
});

test("mesures colour difference #5", () => {
	const colour1: LabColour = {
		L: 90.9257,
		a: -0.5406,
		b: -0.9208,
	};

	const colour2: LabColour = {
		L: 88.6381,
		a: -0.8985,
		b: -0.7239,
	};
	expect(ciede2000(colour1, colour2).toFixed(4)).toBe("1.5381");
});
