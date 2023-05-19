import type { WCAG } from "./types";
/**
 * Evaluates if a colour is dark by measuring the contrast ratio against black and white
 * @param {string} colour - A colour in the hexadecimal format
 * @param {"WCAG2.1" | "WCAG3.0"} standard - Evaluate agains "WCAG2.1" or "WCAG3.0"
 * @returns {boolean} Returns either `true` or `false`
 */
export declare function isHexDarkColour(
	colour: string,
	standard: WCAG,
): boolean;
