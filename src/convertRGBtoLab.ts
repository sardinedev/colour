import { convertRGBtoXYZ } from "./convertRGBtoXYZ";
import { convertXYZtoLab } from "./convertXYZtoLab";
import type { LabColour, RGBColour } from "./types";

/**
 * Indirectly converts RGB to Lab.
 * First converts RGB to XYZ, then converts XYZ to Lab.
 * @param {RGBColour} colour sRGB colour
 * @return {LabColour} Lab colour
 */
export function convertRGBtoLab(colour: RGBColour): LabColour {
	const XYZColour = convertRGBtoXYZ(colour);
	return convertXYZtoLab(XYZColour);
}
