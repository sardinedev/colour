/**
 * Spike #499: prepared palettes vs the one-shot findNearest* functions.
 *
 * - "preparation": cost of preparePalette alone.
 * - "single lookup": one query on an already-prepared palette vs one one-shot call.
 * - "N queries": preparation + N lookups vs N one-shot calls (the break-even question).
 */
import { describe, test } from "vitest";
import { findNearestHexColour, findNearestRGBColour } from "../src/index";
import { preparePalette } from "../src/preparePalette";
import {
	HEX_COLOURS,
	LARGE_HEX_PALETTE,
	MEDIUM_HEX_PALETTE,
	MEDIUM_RGB_PALETTE,
	RGB_COLOURS,
	SMALL_HEX_PALETTE,
} from "./fixtures";

const QUERY_COUNTS = [1, 10, 100] as const;
const queries = (count: number) => HEX_COLOURS.slice(0, count);

const prepared = {
	small: preparePalette(SMALL_HEX_PALETTE),
	medium: preparePalette(MEDIUM_HEX_PALETTE),
	large: preparePalette(LARGE_HEX_PALETTE),
	mediumRGB: preparePalette(MEDIUM_RGB_PALETTE),
};
const TARGET = "#7a2dc8";
const RGB_TARGET = { R: 120, G: 45, B: 200 };

describe("prepared palette", () => {
	test("preparation", async ({ bench }) => {
		await bench.compare(
			bench("preparePalette (16 hex)", () => {
				preparePalette(SMALL_HEX_PALETTE);
			}),
			bench("preparePalette (256 hex)", () => {
				preparePalette(MEDIUM_HEX_PALETTE);
			}),
			bench("preparePalette (1000 hex)", () => {
				preparePalette(LARGE_HEX_PALETTE);
			}),
			bench("preparePalette (256 RGB)", () => {
				preparePalette(MEDIUM_RGB_PALETTE);
			}),
		);
	});

	test("single lookup", async ({ bench }) => {
		await bench.compare(
			bench("prepared lookup (16 hex)", () => {
				prepared.small(TARGET);
			}),
			bench("findNearestHexColour (16 hex)", () => {
				findNearestHexColour(TARGET, SMALL_HEX_PALETTE);
			}),
			bench("prepared lookup (256 hex)", () => {
				prepared.medium(TARGET);
			}),
			bench("findNearestHexColour (256 hex)", () => {
				findNearestHexColour(TARGET, MEDIUM_HEX_PALETTE);
			}),
			bench("prepared lookup (1000 hex)", () => {
				prepared.large(TARGET);
			}),
			bench("findNearestHexColour (1000 hex)", () => {
				findNearestHexColour(TARGET, LARGE_HEX_PALETTE);
			}),
			bench("prepared lookup (256 RGB)", () => {
				prepared.mediumRGB(RGB_TARGET);
			}),
			bench("findNearestRGBColour (256 RGB)", () => {
				findNearestRGBColour(RGB_TARGET, MEDIUM_RGB_PALETTE);
			}),
		);
	});

	for (const [label, palette] of [
		["16 hex", SMALL_HEX_PALETTE],
		["256 hex", MEDIUM_HEX_PALETTE],
	] as const) {
		test(`repeated queries (${label})`, async ({ bench }) => {
			const benches = QUERY_COUNTS.flatMap((count) => {
				const targets = queries(count);
				return [
					bench(`prepare + ${count} lookups (${label})`, () => {
						const nearest = preparePalette(palette);
						for (const target of targets) nearest(target);
					}),
					bench(`${count} × findNearestHexColour (${label})`, () => {
						for (const target of targets) findNearestHexColour(target, palette);
					}),
				];
			});
			await bench.compare(...benches);
		});
	}

	test("repeated queries (256 RGB)", async ({ bench }) => {
		const targets = RGB_COLOURS.slice(0, 10);
		await bench.compare(
			bench("prepare + 10 lookups (256 RGB)", () => {
				const nearest = preparePalette(MEDIUM_RGB_PALETTE);
				for (const target of targets) nearest(target);
			}),
			bench("10 × findNearestRGBColour (256 RGB)", () => {
				for (const target of targets)
					findNearestRGBColour(target, MEDIUM_RGB_PALETTE);
			}),
		);
	});
});
