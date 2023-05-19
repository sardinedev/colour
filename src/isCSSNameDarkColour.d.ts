import type { NamedCSSColour, WCAG } from "./types";
/**
 * Evaluates if a named CSS colour is dark by measuring the contrast ratio against black and white
 * @param {string} name - A named CSS colour, ie: `hotpink`
 * @param {"WCAG2.1" | "WCAG3.0"} standard - Evaluate agains "WCAG2.1" or "WCAG3.0"
 * @returns { boolean } Returns `true`, `false` or `undefined` if name is not a valid CSS named colour
 */
export declare function isCSSNamedDarkColour(
	name: NamedCSSColour,
	standard: WCAG,
): boolean;
