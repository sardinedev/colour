import type { HSVColour } from "./types";

/**
 * Converts an RGB colour to HSV.
 * Conversion formula is based on the RGB to HSV conversion algorithm:
 * https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
 *
 * https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
 * - Hue (h) is calculated based on the maximum RGB value.
 * - Saturation (s) is the chroma divided by the maximum RGB value.
 * - Value (v) is the maximum RGB value.
 * @param r Red channel (0-255)
 * @param g Green channel (0-255)
 * @param b Blue channel (0-255)
 * @returns HSVColour object with h (hue), s (saturation), v (value)
 */
export function convertRGBtoHSV(r: number, g: number, b: number): HSVColour {
	// Normalise RGB values to the range [0, 1]
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;

	// Find the maximum and minimum values among R, G, B
	const max = Math.max(red, green, blue);
	const min = Math.min(red, green, blue);

	// Initialise hue, saturation, and value
	let hue = 0;
	let saturation = 0;
	const value = max; // Value is the maximum of R, G, B

	// Calculate the difference between max and min
	const delta = max - min;

	// Calculate saturation
	if (max === 0) {
		// If max is 0, the colour is black and saturation is 0
		saturation = 0;
	} else {
		// Otherwise, saturation is the chroma divided by value
		saturation = delta / max;
	}

	// Calculate hue
	if (delta !== 0) {
		// If chroma is not zero, determine hue based on which channel is max
		if (max === red) {
			// If red is max, hue is based on the difference between green and blue
			hue = ((green - blue) / delta) % 6;
		} else if (max === green) {
			// If green is max, hue is based on the difference between blue and red
			hue = (blue - red) / delta + 2;
		} else if (max === blue) {
			// If blue is max, hue is based on the difference between red and green
			hue = (red - green) / delta + 4;
		}
		// Convert hue to degrees
		hue = hue * 60;
		// Ensure hue is non-negative
		if (hue < 0) {
			hue = hue + 360;
		}
	}

	// Return the HSV colour object
	return { h: hue, s: saturation, v: value };
}
