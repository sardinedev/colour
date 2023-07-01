import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex.js";
import type { WCAG } from "./types.js";

type ColorArgs = {
	backgroundColour: string;
	optionOneColour: string;
	optionTwoColour: string;
};

const relativeContrast = (firstColour: number, secondColour: number) => {
	if (firstColour > secondColour) {
		return firstColour / secondColour;
	}
	return secondColour / firstColour;
};

export const pickHexColourContrast = (
	{ backgroundColour, optionOneColour, optionTwoColour }: ColorArgs,
	standard: WCAG,
): string => {
	const backgroundColourLuminance =
		getSRGBLuminanceFromHex(backgroundColour, standard) + 0.05;
	const optionOneColourLuminance =
		getSRGBLuminanceFromHex(optionOneColour, standard) + 0.05;
	const optionTwoColourLuminance =
		getSRGBLuminanceFromHex(optionTwoColour, standard) + 0.05;

	const optionOneContrast = relativeContrast(
		optionOneColourLuminance,
		backgroundColourLuminance,
	);
	const optionTwoContrast = relativeContrast(
		optionTwoColourLuminance,
		backgroundColourLuminance,
	);

	if (optionOneContrast > optionTwoContrast) {
		return optionOneColour;
	}
	return optionTwoColour;
};
