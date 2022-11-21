import test from "ava";
import { convertRGBtoLab } from "../convertRGBtoLab.js";
import type { LabColour, RGBColour } from "../types";

test("converts RGB to Lab", ({ deepEqual }) => {
    const RGB: RGBColour = { R: 34, G: 250, B: 124 };
    const expectedLab: LabColour = {
      L: 87.07847680208145,
      a: -74.4060883781999,
      b: 46.74058735821831,
    };
    deepEqual(convertRGBtoLab(RGB), expectedLab);
  });