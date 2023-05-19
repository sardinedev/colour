import type { NamedCSSColour } from "./types";
/**
 * Converts a named CSS Colour in an hexadecimal one.
 *
 * List of colours sourced here:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param {NamedCSSColour} name - A named CSS colour
 * @returns {string} - An hexadecimal string
 */
export declare function convertNamedCSSColourtoHex(
	name: NamedCSSColour,
): string | undefined;
