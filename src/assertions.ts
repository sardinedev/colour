import { cssRGBARegex } from "./util/regexers.js";

export const isCSSRGBColour = (colour: string): boolean =>
  !!colour.match(cssRGBARegex);
