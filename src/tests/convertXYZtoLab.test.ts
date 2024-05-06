import test from "ava";
import { convertXYZtoLab } from "../convertXYZtoLab";
import type { LabColour, XYZColour } from "../types";

test("convert XYZ to Lab", ({ deepEqual }) => {
	const XYZ: XYZColour = {
		X: 20.517540535826125,
		Y: 21.586050011389926,
		Z: 23.50720846240363,
	};

	const expectedLab: LabColour = {
		L: 53.58501345216902,
		a: 0.003155620347972121,
		b: -0.006243566036268078,
	};

	deepEqual(convertXYZtoLab(XYZ), expectedLab);
});

test("convert XYZ to Lab with constrains", ({ deepEqual }) => {
	const XYZ: XYZColour = {
		X: 0,
		Y: 18.30616888722103,
		Z: 19.436790978392008,
	};

	const expectedLab: LabColour = {
		L: 49.8653712598923,
		a: -214.93694508574265,
		b: 0.9489453364894151,
	};

	deepEqual(convertXYZtoLab(XYZ), expectedLab);
});
