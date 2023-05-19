import type { WCAG } from "./types";
type ColorArgs = {
	backgroundColour: string;
	optionOneColour: string;
	optionTwoColour: string;
};
export declare const pickHexColourContrast: (
	{ backgroundColour, optionOneColour, optionTwoColour }: ColorArgs,
	standard: WCAG,
) => string;
export {};
