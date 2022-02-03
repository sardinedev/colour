import { ciede2000 } from "./CIEDE2000";
import type { RGBColour } from "./colour.interface";
import { convertRGBtoLab } from "./converters";

export const RGBdistance = (colour1: RGBColour, colour2: RGBColour): number => {
  const c1 = convertRGBtoLab(colour1);
  const c2 = convertRGBtoLab(colour2);

  return ciede2000(c1, c2);
};
