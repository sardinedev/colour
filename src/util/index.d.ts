import type { HueHelper } from "../types";
/**
 * Calculates the Hue derivative
 * @param x A numeric expression representing the cartesian x-coordinate.
 * @param y A numeric expression representing the cartesian y-coordinate.
 */
export declare function hue_d(x: number, y: number): number;
/**
 * Calculates the difference between two Hue derivatives
 * @param HueHelper param
 */
export declare function deltaHue_d({ C1, C2, h1_d, h2_d }: HueHelper): number;
/**
 * Calculates the mean between two Hue derivatives
 * @param HueHelper param
 */
export declare function meanHue_d({ C1, C2, h1_d, h2_d }: HueHelper): number;
/**
 * Converts a number in degrees to radians
 * @param n Number in degrees to be converted
 */
export declare const toRadians: (n: number) => number;
/**
 * Calculates a recurring square root
 * @param n Input number
 */
export declare const bigSquare: (n: number) => number;
/**
 * Normalise black and white colorimetry as specified in IEC 61966-2-1
 * It takes a RGB channel in the range [0 - 255] and returns a value between 0 and 1
 * @param rgbValue number to be normalised
 */
export declare function linearRGB(rgbValue: number, WCAG21?: boolean): number;
/**
 * The division of the f function domain into two parts was done to prevent an infinite slope at n = 0
 * @param n Number to be constrained
 */
export declare function constrainLab(n: number): number;
/**
 * Clamps a number between two values
 * @param {number} value - The value to be clamped
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} - A clamped value
 */
export declare function clamp(value: number, min: number, max: number): number;
