import test from "ava";
import { convertHextoRGB } from "../convertHextoRGB.js";
import type { RGBColour } from "../types";

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
    // @ts-ignore: Passing wrong type for test only
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