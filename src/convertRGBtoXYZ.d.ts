import type { RGBColour, XYZColour } from "./types";
/**
 * Converts sRGB colour space to XYZ.
 * Math comes from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
 * @param {RGBColour} colour sRGB colour
 * @return {XYZColour} XYZ colour
 */
export declare function convertRGBtoXYZ(colour: RGBColour): XYZColour;
