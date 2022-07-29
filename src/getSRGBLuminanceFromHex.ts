import { convertHextoRGB } from "./converters.js";
import { linearRGB } from "./util/index.js";

/**
 * Returns the relative luminance of a colour in the sRGB space.
 *
 * The calculations are compatible with WCAG 3.0 as it aligns with the sRGB spec
 * and difference to WCAG 2.1 is minimal in a 8 bit channel.
 *
 * https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 *
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 * @param colour an hexadecimal colour
 */
export const getSRGBLuminanceFromHex = (colour: string) => {
  const rgbColor = convertHextoRGB(colour);
  const r = linearRGB(rgbColor.R);
  const g = linearRGB(rgbColor.G);
  const b = linearRGB(rgbColor.B);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
