import { constrainLab } from "./util/index.js";
import type { LabColour, XYZColour } from "./types";

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
