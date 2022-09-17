import { isHexDarkColour } from "./isHexDarkColour.js";
import { isCSSRGBDarkColour } from "./isCSSRGBDarkColour.js";
import { isCSSNamedDarkColour } from "./isCSSNameDarkColour.js";
import type { NamedCSSColour, WCAG } from "./types";

/**
 * Evaluates if a colour is dark by measuring the contrast ratio against black and white.
 * It accepts CSS RGB colours, named CSS or hexadecimal.
 * 
 * If you know in advance the type of colour you want to evaluate consider using `isCSSNamedDarkColour`, `isCSSRGBDarkColour` or `isHexDarkColour` as they are smaller functions
 * @param {string | NamedCSSColour} colour - A colour value, ie: `hotpink`, `#333222` or `rgb(12,34,45)` 
 * @param {"WCAG2.1" | "WCAG3.0"} standard - Evaluate agains "WCAG2.1" or "WCAG3.0"
 * @returns {boolean} Returns `true`, `false` or `undefined` if name is not a valid CSS named colour
 */
export function isDarkColour(colour: string | NamedCSSColour, standard: WCAG): boolean {
    try {
        if (colour.startsWith('#')) {
            return isHexDarkColour(colour, standard);
        }
        if (colour.startsWith('rgb')) {
            return isCSSRGBDarkColour(colour, standard);
        }
        return isCSSNamedDarkColour(colour as NamedCSSColour, standard);
    } catch (error) {
        throw new Error(`${colour} is not a valid colour format. isDarkColour accepts CSS RGB formats, ie rgb(0,0,0) and rgba(255, 255, 255, 0.4), hexadecimal and CSS named colours.`)

    }
}