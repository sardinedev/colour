import { isCSSRGBColour, isHexColour, isNamedCSSColour } from "./assertions";
import { ciede2000 } from "./CIEDE2000";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertNamedCSSColourtoRGB } from "./convertNamedCSSColourtoRGB";
import { convertRGBtoLab } from "./convertRGBtoLab";
import type { LabColour, NamedCSSColour, RGBColour } from "./types";

export type PaletteColour = string | RGBColour;

export interface PreparedRGBColour {
	readonly R: number;
	readonly G: number;
	readonly B: number;
	readonly A?: number | undefined;
}

export type PreparedPalette<T extends PaletteColour> = [T] extends [string]
	? (colour: string) => string | null
	: [T] extends [RGBColour]
		? (colour: RGBColour) => PreparedRGBColour | null
		: (colour: PaletteColour) => string | PreparedRGBColour | null;

type PreparedEntry = {
	value: string | PreparedRGBColour;
	lab: LabColour;
};

function convertStringToRGB(colour: string): RGBColour | null {
	if (isHexColour(colour)) {
		return convertHextoRGB(colour);
	}
	if (isCSSRGBColour(colour)) {
		return convertCSSRGBtoRGB(colour);
	}
	if (isNamedCSSColour(colour as NamedCSSColour)) {
		return convertNamedCSSColourtoRGB(colour as NamedCSSColour) ?? null;
	}
	return null;
}

function isValidRGB(colour: RGBColour): boolean {
	return (
		Number.isFinite(colour.R) &&
		Number.isFinite(colour.G) &&
		Number.isFinite(colour.B) &&
		colour.R >= 0 &&
		colour.R <= 255 &&
		colour.G >= 0 &&
		colour.G <= 255 &&
		colour.B >= 0 &&
		colour.B <= 255
	);
}

function convertPaletteColour(
	colour: PaletteColour,
): { value: string | PreparedRGBColour; rgb: RGBColour } | null {
	if (typeof colour === "string") {
		const rgb = convertStringToRGB(colour);
		return rgb ? { value: colour, rgb } : null;
	}
	if (!colour || !isValidRGB(colour)) {
		return null;
	}
	const rgb =
		"A" in colour
			? { R: colour.R, G: colour.G, B: colour.B, A: colour.A }
			: { R: colour.R, G: colour.G, B: colour.B };
	const snapshot = Object.freeze(rgb);
	return { value: snapshot, rgb: snapshot };
}

function convertTargetToRGB(colour: PaletteColour): RGBColour | null {
	if (typeof colour === "string") {
		return convertStringToRGB(colour);
	}
	return colour && isValidRGB(colour) ? colour : null;
}

/**
 * Prepares an immutable palette snapshot for repeated nearest-colour lookups.
 * String entries are returned unchanged; RGB entries are returned as frozen copies,
 * not as the original objects. Later edits to the source palette require preparation again.
 */
export function preparePalette<T extends PaletteColour>(
	palette: readonly T[],
): PreparedPalette<T> {
	const entries: PreparedEntry[] = [];
	for (const colour of palette) {
		const converted = convertPaletteColour(colour);
		if (converted) {
			entries.push({
				value: converted.value,
				lab: convertRGBtoLab(converted.rgb),
			});
		}
	}
	Object.freeze(entries);

	return ((colour: PaletteColour) => {
		if (entries.length === 0) {
			return null;
		}
		const rgb = convertTargetToRGB(colour);
		if (!rgb) {
			return null;
		}
		const lab = convertRGBtoLab(rgb);
		let nearest: PreparedEntry | undefined;
		let minDistance = Number.POSITIVE_INFINITY;
		for (const entry of entries) {
			const distance = ciede2000(lab, entry.lab);
			if (distance < minDistance) {
				minDistance = distance;
				nearest = entry;
			}
		}
		return nearest?.value ?? null;
	}) as PreparedPalette<T>;
}
