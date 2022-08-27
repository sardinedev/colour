import test from "ava";
import {
  convertHextoRGB,
  convertRGBtoHex,
  convertRGBtoLab,
  convertRGBtoXYZ,
  convertXYZtoLab,
} from "../converters.js";
import { ciede2000 } from "../CIEDE2000.js";
import type { LabColour, RGBColour, XYZColour } from "../types";

test("convert RGB to XYZ", ({ deepEqual }) => {
  const RGB: RGBColour = { R: 34, G: 250, B: 124 };
  const expectedXYZ: XYZColour = {
    X: 38.483384631576946,
    Y: 70.16653157373521,
    Z: 30.583997140084364,
  };
  deepEqual(convertRGBtoXYZ(RGB), expectedXYZ);
});

test("convert RGB to XYZ with reverse transformation", ({ deepEqual }) => {
  const RGB: RGBColour = { R: 0, G: 250, B: 124 };
  const expectedXYZ: XYZColour = {
    X: 37.82369749318333,
    Y: 69.82645037678448,
    Z: 30.553124293888928,
  };
  deepEqual(convertRGBtoXYZ(RGB), expectedXYZ);
});

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

test("mesures colour difference", ({ is }) => {
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
  is(ciede2000(colour1, colour2), 2.0424596801565738);
});

test("converts RGB to Lab", ({ deepEqual }) => {
  const RGB: RGBColour = { R: 34, G: 250, B: 124 };
  const expectedLab: LabColour = {
    L: 87.07847680208145,
    a: -74.4060883781999,
    b: 46.74058735821831,
  };
  deepEqual(convertRGBtoLab(RGB), expectedLab);
});

test("converts a 6 digit hexadecimal colour string to RGB format", ({
  deepEqual,
}) => {
  const hex = "#ffffff";
  const expectedRGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
  };
  deepEqual(convertHextoRGB(hex), expectedRGB);
});

test("converts a 3 digit hexadecimal colour string to RGB format", ({
  deepEqual,
}) => {
  const hex = "#fff";
  const expectedRGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
  };
  deepEqual(convertHextoRGB(hex), expectedRGB);
});

test("converts a 8 digit hexadecimal (RGB + Alpha) colour string to RGBA format", ({
  deepEqual,
}) => {
  const hex = "#ffffffff";
  const expectedRGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
    A: 1,
  };
  deepEqual(convertHextoRGB(hex), expectedRGB);
});

test("converts a 4 digit hexadecimal (RGB + Alpha) colour string to RGBA format", ({
  deepEqual,
}) => {
  const hex = "#ffff";
  const expectedRGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
    A: 1,
  };
  deepEqual(convertHextoRGB(hex), expectedRGB);
});

test("throws an error if not passing a string", ({ is, throws }) => {
  const hex = 235434;
  // @ts-ignore
  const error = throws(() => convertHextoRGB(hex)) as Error;
  is(error.message, "convertHextoRGB expects a string but got a number");
});

test("throws an error if not passing a valid hexadecimal value", ({
  is,
  throws,
}) => {
  const hex = "HH77ZZs";
  const error = throws(() => convertHextoRGB(hex)) as Error;
  is(
    error.message,
    "convertHextoRGB expects an valid hexadecimal colour value but got HH77ZZs"
  );
});

test("converts RGB format to hexadecimal colour", ({
  is
}) => {
  const expectedHex = "#ffffff";
  const RGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
  };
  is(convertRGBtoHex(RGB), expectedHex);
});

test("converts RGBA format to hexadecimal colour with alpha channel", ({
  is
}) => {
  const expectedHex = "#ffffff80";
  const RGB: RGBColour = {
    R: 255,
    G: 255,
    B: 255,
    A: 0.5
  };
  is(convertRGBtoHex(RGB), expectedHex);
});