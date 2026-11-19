/**
 * Retained memory of prepared palettes (#499, decision 0010), measured on CI.
 *
 * CodSpeed's memory mode counts native allocations, so it can't see JavaScript
 * objects that V8 places on heap pages it already owns. This measures the V8 heap
 * directly instead: prepare many copies, keep them alive, force GC, and divide the
 * heap growth by the number of entries. The prepared palettes must stay reachable
 * until after the second reading, or V8 collects them early and the result is 0.
 */
import { setFlagsFromString } from "node:v8";
import { runInNewContext } from "node:vm";
import { expect, test } from "vitest";
import { convertRGBtoHex } from "./convertRGBtoHex";
import { preparePalette } from "./preparePalette";
import type { RGBColour } from "./types";

setFlagsFromString("--expose-gc");
const gc = runInNewContext("gc") as () => void;

// A regression guard, not the decision threshold: decision 0010 required < 200 B and
// measured ~117 B (hex) and ~165 B (RGB). The wider limit leaves room for V8 layout
// differences across Node versions, so only a real regression trips it.
const BUDGET_BYTES_PER_ENTRY = 300;

function createRandom(seed: number) {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
}
// Same generator, seed and size as LARGE_RGB_PALETTE in bench/fixtures.ts, so the
// memory figures describe the palettes CodSpeed benchmarks. src/ tests don't import
// from bench/, so it's repeated here.
const random = createRandom(7);
const RGB_PALETTE: RGBColour[] = Array.from({ length: 1000 }, () => ({
	R: Math.floor(random() * 256),
	G: Math.floor(random() * 256),
	B: Math.floor(random() * 256),
}));
const HEX_PALETTE = RGB_PALETTE.map((rgb) => convertRGBtoHex(rgb));

function heapUsed(): number {
	gc();
	gc();
	return process.memoryUsage().heapUsed;
}

/** Median retained bytes per palette entry over several runs. */
function retainedBytesPerEntry(
	palette: readonly (string | RGBColour)[],
	copies: number,
): number {
	const keepAlive: unknown[] = [];
	const samples: number[] = [];
	for (let run = 0; run < 5; run++) {
		const before = heapUsed();
		keepAlive.push(
			Array.from({ length: copies }, () => preparePalette(palette)),
		);
		const after = heapUsed();
		samples.push((after - before) / (copies * palette.length));
	}
	// Read keepAlive after the last measurement so V8 can't collect it early
	expect(keepAlive).toHaveLength(5);
	samples.sort((a, b) => a - b);
	return samples[2] as number;
}

test.for([
	["1000 hex", HEX_PALETTE, 50],
	["256 hex", HEX_PALETTE.slice(0, 256), 200],
	["1000 RGB", RGB_PALETTE, 50],
] as const)(
	"retained memory per entry (%s) stays under budget",
	async ([label, palette, copies], { annotate }) => {
		const bytes = retainedBytesPerEntry(palette, copies);
		// Annotations appear as notices on GitHub Actions, so CI records the measurement
		await annotate(
			`#499 retained memory, Node ${process.version}, ${label}: ${bytes.toFixed(1)} B/entry (${((bytes * palette.length) / 1024).toFixed(1)} KiB per palette)`,
			"notice",
		);
		expect(bytes).toBeGreaterThan(0);
		expect(bytes).toBeLessThan(BUDGET_BYTES_PER_ENTRY);
	},
);
