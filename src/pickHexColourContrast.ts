import { getSRGBLuminanceFromHex } from "./getSRGBLuminanceFromHex";
import type { WCAG } from "./types";

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
): string | null => {
	const bgLum = getSRGBLuminanceFromHex(backgroundColour, standard);
	const opt1Lum = getSRGBLuminanceFromHex(optionOneColour, standard);
	const opt2Lum = getSRGBLuminanceFromHex(optionTwoColour, standard);
	if (bgLum === null || opt1Lum === null || opt2Lum === null) return null;
	const backgroundColourLuminance = bgLum + 0.05;
	const optionOneColourLuminance = opt1Lum + 0.05;
	const optionTwoColourLuminance = opt2Lum + 0.05;

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
