import { LabColour, RGBColour, XYZColour } from "./colour.interface";
import { constrainLab, reverseTransformation } from "./util/index.js";

/**
 * Converts sRGB colour space to XYZ.
 * Math comes from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
 * @param {RGBColour} colour sRGB colour
 * @return {XYZColour} XYZ colour
 */
export function convertRGBtoXYZ(colour: RGBColour): XYZColour {
  const { R, G, B } = colour;

  //sRGB values in the range 0 to 1
  const rR: number = R / 255;
  const rG: number = G / 255;
  const rB: number = B / 255;

  const _R = reverseTransformation(rR) * 100;
  const _G = reverseTransformation(rG) * 100;
  const _B = reverseTransformation(rB) * 100;

  // Magic numbers are pre-calculated sRGB D65 constants
  const X = _R * 0.4124 + _G * 0.3576 + _B * 0.1805;
  const Y = _R * 0.2126 + _G * 0.7152 + _B * 0.0722;
  const Z = _R * 0.0193 + _G * 0.1192 + _B * 0.9505;

  return { X, Y, Z };
}

/**
 * Converts XYZ colour space to Lab
 * Math comes from https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB[11]
 * @param colour XYZ colour
 * @return {LabColour} Lab colour
 */
export function convertXYZtoLab(colour: XYZColour): LabColour {
  const { X, Y, Z } = colour;

  // Magic numbers are normalised for relative luminance from the D65 standard
  const _X = X / 95.0489;
  const _Y = Y / 100;
  const _Z = Z / 108.884;

  const fX = constrainLab(_X);
  const fY = constrainLab(_Y);
  const fZ = constrainLab(_Z);

  const L = 116 * fY - 16;
  const a = 500 * (fX - fY);
  const b = 200 * (fY - fZ);

  return { L, a, b };
}

/**
 * Indirectly converts RGB to Lab.
 * First converts RGB to XYZ,
 * Then converts XYZ to Lab
 * @param {RGBColour} colour sRGB colour
 * @return {LabColour} Lab colour
 */
export function convertRGBtoLab(colour: RGBColour): LabColour {
  const XYZColour = convertRGBtoXYZ(colour);
  return convertXYZtoLab(XYZColour);
}
