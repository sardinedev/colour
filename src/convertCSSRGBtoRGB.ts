import { cssRGBARegex } from "./util/regexers.js";
import type { RGBColour } from "./types";

/**
 * Converts CSS RGB colour format into RGB colour object.
 * @param {string} colour - A CSS RGB colour in the format:
 *
 * - `rgb(0,0,0)`
 * - `rgba(0,0,0,0.4)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 *
 * @returns {RGBColour} - RGB colour object.
 */
export function convertCSSRGBtoRGB(colour: string): RGBColour {
  const match = colour.match(cssRGBARegex);
  if (!match) { throw new Error(`convertCSSRGBtoHex expects a valid CSS RGB string but got ${colour}`); }
  const rgbNumber = (n: string): number => parseInt(n, 10);
  const alphaNumber = (n: string): number => parseFloat(n) ?? undefined;
  return {
    R: rgbNumber(match[1] as string),
    G: rgbNumber(match[2] as string),
    B: rgbNumber(match[3] as string),
    A: alphaNumber(match[4] as string)
  };
}
