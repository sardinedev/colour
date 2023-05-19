import type { LabColour, XYZColour } from "./types";
/**
 * Converts XYZ colour space to Lab
 * Math comes from https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB[11]
 * @param colour XYZ colour
 * @return {LabColour} Lab colour
 */
export declare function convertXYZtoLab(colour: XYZColour): LabColour;
