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
export declare function convertCSSRGBtoRGB(colour: string): RGBColour;
