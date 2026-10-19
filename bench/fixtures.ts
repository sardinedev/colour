import type { NamedCSSColour, RGBColour } from "../src/types";

/** Deterministic pseudo-random generator so every run uses the same inputs. */
function createRandom(seed: number) {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
}

function generateRGBColours(count: number, seed: number): RGBColour[] {
	const random = createRandom(seed);
	return Array.from({ length: count }, () => ({
		R: Math.floor(random() * 256),
		G: Math.floor(random() * 256),
		B: Math.floor(random() * 256),
	}));
}

function toHex({ R, G, B }: RGBColour): string {
	return `#${[R, G, B].map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

export const RGB_COLOURS = generateRGBColours(100, 42);
export const HEX_COLOURS = RGB_COLOURS.map(toHex);

export const LARGE_RGB_PALETTE = generateRGBColours(1000, 7);
export const LARGE_HEX_PALETTE = LARGE_RGB_PALETTE.map(toHex);

export const CSS_RGB_COLOURS = RGB_COLOURS.map(
	(c) => `rgb(${c.R}, ${c.G}, ${c.B})`,
);
export const CSS_RGB_PALETTE = LARGE_RGB_PALETTE.slice(0, 200).map(
	(c) => `rgb(${c.R}, ${c.G}, ${c.B})`,
);

/** Includes the `grey`/`gray` and `cyan`/`aqua` aliases. */
export const NAMED_COLOURS: NamedCSSColour[] = [
	"aliceblue",
	"aqua",
	"black",
	"cornflowerblue",
	"cyan",
	"darkslategray",
	"gold",
	"gray",
	"grey",
	"hotpink",
	"navy",
	"rebeccapurple",
	"white",
	"yellowgreen",
];

/** Strings that none of the format assertions should accept. */
export const INVALID_COLOURS = [
	"",
	"fff",
	"#ggg",
	"#12345",
	"zzz(23, 111, 87)",
	"rgb(12, 23)",
	"neve",
	"Red",
];
