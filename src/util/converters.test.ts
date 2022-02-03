import { LabColour, RGBColour, XYZColour } from "../colour.interface";
import { convertRGBtoXYZ, convertXYZtoLab } from "./converters";
import { ciede2000 } from './CIEDE2000';

test("convert RGB to XYZ", () => {
  const RGB: RGBColour = { R: 34, G: 250, B: 124 };
  const expectedXYZ: XYZColour = {
    X: 38.483384631576946,
    Y: 70.16653157373521,
    Z: 30.583997140084364,
  };
  expect(convertRGBtoXYZ(RGB)).toEqual(expectedXYZ);
});

test("convert RGB to XYZ with reverse transformation", () => {
  const RGB: RGBColour = { R: 0, G: 250, B: 124 };
  const expectedXYZ: XYZColour = {
    X: 37.82369749318333,
    Y: 69.82645037678448,
    Z: 30.553124293888928,
  };
  expect(convertRGBtoXYZ(RGB)).toEqual(expectedXYZ);
});

test("convert XYZ to Lab", () => {
  const XYZ: XYZColour = {
    X: 38.483384631576946,
    Y: 70.16653157373521,
    Z: 30.583997140084364,
  };

  const expectedLab: LabColour = {
    L: 87.07847680208145,
    a: -74.40855311054922,
    b: 46.740988339462405,
  };

  expect(convertXYZtoLab(XYZ)).toEqual(expectedLab);
});

test("convert XYZ to Lab with constrains", () => {
  const XYZ: XYZColour = {
    X: 0,
    Y: 18.30616888722103,
    Z: 19.436790978392008,
  };

  const expectedLab: LabColour = {
    L: 49.8653712598923,
    a: -214.93694508574265,
    b: 0.9492900837566598,
  };

  expect(convertXYZtoLab(XYZ)).toEqual(expectedLab);
});

test("mesures colour difference", () => {

  const colour1: LabColour = {
    L: 50.0000,
    a: 2.6772,
    b: -79.7751,
  };

  const colour2: LabColour = {
    L: 50.0000,
    a: 0.0000,
    b: -82.7485,
  };
expect(ciede2000(colour1, colour2)).toBe(2.0424596801565738);
});
