import type { RGBColour } from "./types";
import { clamp } from "./util/index";

/**
 * Converts a colour in the RGB format to Hexadecimal.
 * It accepts an option Alpha channel `A`
 * @param {RGBColour} colour - An object representing RGB Colour.
 * @param {number} colour.R - A number between 0 and 255 to describe the Red colour channel
 * @param {number} colour.G - A number between 0 and 255 to describe the Green colour channel
 * @param {number} colour.B - A number between 0 and 255 to describe the Blue colour channel
 * @param {number} colour.A - An optional number between 0 and 1 to describe the Alpha colour channel
 * @returns - An hexadecimal string
 */
export function convertRGBtoHex({ R, G, B, A }: RGBColour): string {
	const hex = (n: number) =>
		Math.round(clamp(n, 0, 255))
			.toString(16)
			.padStart(2, "0");
	const alpha = A === undefined ? "" : hex(clamp(A, 0, 1) * 255);
	return `#${hex(R)}${hex(G)}${hex(B)}${alpha}`;
}
