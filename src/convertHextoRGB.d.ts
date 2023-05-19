import type { RGBColour } from "./types";
/**
 * Converts an hexadecimal colour into RGB colour object.
 * @param {string} hex - An hexadecimal colour in the format:
 *
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 *
 * @returns {RGBColour} - RGB colour object.
 */
export declare function convertHextoRGB(hex: string): RGBColour;
