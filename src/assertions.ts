import {
	cssRGBARegex,
	hexRegex,
	hexAlphaRegex,
	shortAlphaHexRegex,
	shortHexRegex,
} from "./util/regexers.js";

export const isCSSRGBColour = (colour: string): boolean =>
	!!colour.match(cssRGBARegex);

export const isHexColour = (colour: string) =>
	!!colour.match(hexRegex) ||
	!!colour.match(hexAlphaRegex) ||
	!!colour.match(shortAlphaHexRegex) ||
	!!colour.match(shortHexRegex);
