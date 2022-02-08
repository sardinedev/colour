import { constrainLab, linearRGB } from "./util/index.js";

/**
 * The RGB colour model represents a broad array of colours by describing the Red, Green and Blue channels.
 */
 export interface RGBColour {
  /** A number between 0 and 255 to describe the Red colour channel */
  R: number;
  /** A number between 0 and 255 to describe the Green colour channel */
  G: number;
  /** A number between 0 and 255 to describe the Blue colour channel */
  B: number;
  /** A optional number between 0 and 1 to describe the Alpha colour channel */
  A?: number;
}

/**
 * L*a*b* space is three-dimensional and covers the entire range of human colour perception
 */
export interface LabColour {
  /** A number between 0 and 100 to describe the colour's lightness. (0 - black, 100 - white)  */
  L: number;
  /** A number between -128 and 127 to describe the green–red opponent colors, with negative values toward green and positive values toward red */
  a: number;
  /** A number between -128 and 127 to describe  blue–yellow opponents, with negative numbers toward blue and positive toward yellow */
  b: number;
}

/**
 * The CIE XYZ colour space is a device independent colour representation
 */
export interface XYZColour {
  /** X is a mix of response curves chosen to be nonnegative */
  X: number;
  /** Y as luminance */
  Y: number;
  /** Z is quasi-equal to blue */
  Z: number;
}

/**
 * Converts sRGB colour space to XYZ.
 * Math comes from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
 * @param {RGBColour} colour sRGB colour
 * @return {XYZColour} XYZ colour
 */
export function convertRGBtoXYZ(colour: RGBColour): XYZColour {
  const { R, G, B } = colour;

  const _R = linearRGB(R) * 100;
  const _G = linearRGB(G) * 100;
  const _B = linearRGB(B) * 100;

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
  const _X = X / 95.047;
  const _Y = Y / 100;
  const _Z = Z / 108.883;

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
