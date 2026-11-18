import { describe, expect, test } from "vitest";
import { convertCSSRGBtoRGB } from "./convertCSSRGBtoRGB";
import { convertHextoCSSRGB } from "./convertHextoCSSRGB";
import { convertHextoRGB } from "./convertHextoRGB";
import { convertRGBtoHex } from "./convertRGBtoHex";

const BYTES = Array.from({ length: 256 }, (_, byte) => byte);
const NIBBLES = Array.from({ length: 16 }, (_, nibble) => nibble);
const toHex = (n: number, width: number) => n.toString(16).padStart(width, "0");

function cssAlpha(css: string | null): string {
	const alpha = css?.match(/,([^,]+)\)$/)?.[1];
	if (alpha === undefined) throw new Error(`no alpha in ${css}`);
	return alpha;
}

describe("long hex alpha (all 256 bytes)", () => {
	test.each(BYTES)("byte %i parses to byte / 255", (byte) => {
		expect(convertHextoRGB(`#336699${toHex(byte, 2)}`)?.A).toBe(byte / 255);
	});

	test.each(BYTES)("byte %i round-trips through RGB to hex", (byte) => {
		const hex = `#336699${toHex(byte, 2)}`;
		const rgb = convertHextoRGB(hex);
		expect(rgb && convertRGBtoHex(rgb)).toBe(hex);
	});

	test.each(BYTES)(
		"byte %i serializes to CSS with at most 3 decimals that map back to the same byte",
		(byte) => {
			const alpha = cssAlpha(convertHextoCSSRGB(`#336699${toHex(byte, 2)}`));
			expect(alpha).toMatch(/^(0|1|0\.\d{1,3})$/);
			expect(Math.round(Number(alpha) * 255)).toBe(byte);
		},
	);

	test.each(BYTES)("byte %i round-trips through CSS RGB to hex", (byte) => {
		const hex = `#336699${toHex(byte, 2)}`;
		const rgb = convertCSSRGBtoRGB(convertHextoCSSRGB(hex) ?? "");
		expect(rgb && convertRGBtoHex(rgb)).toBe(hex);
	});
});

describe("short hex alpha (all 16 values)", () => {
	test.each(NIBBLES)("nibble %i parses to its doubled byte / 255", (nibble) => {
		expect(convertHextoRGB(`#369${toHex(nibble, 1)}`)?.A).toBe(
			(nibble * 17) / 255,
		);
	});

	test.each(NIBBLES)("nibble %i serializes to the long form", (nibble) => {
		const rgb = convertHextoRGB(`#369${toHex(nibble, 1)}`);
		expect(rgb && convertRGBtoHex(rgb)).toBe(`#336699${toHex(nibble * 17, 2)}`);
	});
});

test("uses the shortest CSS alpha that browsers would print", () => {
	expect(convertHextoCSSRGB("#00000080")).toBe("rgba(0,0,0,0.5)");
	expect(convertHextoCSSRGB("#00000001")).toBe("rgba(0,0,0,0.004)");
	expect(convertHextoCSSRGB("#000000ff")).toBe("rgba(0,0,0,1)");
	expect(convertHextoCSSRGB("#00000000")).toBe("rgba(0,0,0,0)");
});
