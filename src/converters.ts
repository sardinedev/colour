import type { LabColour, RGBColour, XYZColour } from "./types";
import { constrainLab, linearRGB } from "./util/index.js";

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

export function convertHextoRGB(hex: string): RGBColour {
  /** Six digit Hexadecimal colour, ie: #12FF21 */
  const hexRegex = /^#[a-fA-F0-9]{6}$/;
  /** Eight digit Hexadecimal colour, ie: #12FF21BE */
  const hexAlphaRegex = /^#[a-fA-F0-9]{8}$/;
  /** Three digit Hexadecimal colour, ie: #FFF */
  const shortHexRegex = /^#[a-fA-F0-9]{3}$/;
  /** Four digit Hexadecimal colour, ie: #FFF4 */
  const shortAlphaHexRegex = /^#[a-fA-F0-9]{4}$/;

  if (typeof hex !== "string") {
    throw new Error(`convertHextoRGB expects a string but got a ${typeof hex}`);
  }

  if (hex.match(hexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[2]}`, 16),
      G: parseInt(`${hex[3]}${hex[4]}`, 16),
      B: parseInt(`${hex[5]}${hex[6]}`, 16),
    };
  }

  if (hex.match(shortHexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[1]}`, 16),
      G: parseInt(`${hex[2]}${hex[2]}`, 16),
      B: parseInt(`${hex[3]}${hex[3]}`, 16),
    };
  }

  if (hex.match(hexAlphaRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[2]}`, 16),
      G: parseInt(`${hex[3]}${hex[4]}`, 16),
      B: parseInt(`${hex[5]}${hex[6]}`, 16),
      A: parseInt(`${hex[7]}${hex[8]}`, 16) / 255,
    };
  }

  if (hex.match(shortAlphaHexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[1]}`, 16),
      G: parseInt(`${hex[2]}${hex[2]}`, 16),
      B: parseInt(`${hex[3]}${hex[3]}`, 16),
      A: parseInt(`${hex[4]}${hex[4]}`, 16) / 255,
    };
  }

  throw new Error(
    `convertHextoRGB expects an valid hexadecimal colour value but got ${hex}`
  );
}
