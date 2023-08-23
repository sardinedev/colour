import type { RGBColour } from "./types.js";

/**
 * Converts an RGB colour object to a CSS RGB colour string.
 *
 * @param {RGBColour} colour - The RGB colour object to convert.
 * @returns {string} The CSS RGB colour string in the format `rgb(R G B)` or `rgb(R G B / A)` if the alpha channel is present.
 */
export function convertRGBtoCSSRGB({ R, G, B, A }: RGBColour): string {
	return `rgb(${R} ${G} ${B}${A ? ` / ${A}` : ""})`;
}
