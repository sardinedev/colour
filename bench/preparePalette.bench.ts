import { test } from "vitest";
import { findNearestRGBColour, preparePalette } from "../src/index";
import { LARGE_RGB_PALETTE, RGB_COLOURS } from "./fixtures";

test("prepared palette matching", async ({ bench }) => {
	for (const size of [2, 16, 256, 1000]) {
		const palette = LARGE_RGB_PALETTE.slice(0, size);
		const prepared = preparePalette(palette);
		const targets = RGB_COLOURS;
		let sink = 0;

		await bench(`preparation (${size} RGB colours)`, () => {
			const matcher = preparePalette(palette);
			sink += Number(typeof matcher === "function");
			return sink;
		});

		for (const queryCount of [1, 10, 100]) {
			const queries = targets.slice(0, queryCount);

			await bench(
				`prepared lookup (${size} colours, ${queryCount} queries)`,
				() => {
					for (const target of queries) {
						sink += prepared(target)?.R ?? 0;
					}
					return sink;
				},
			);

			await bench(`one-shot (${size} colours, ${queryCount} queries)`, () => {
				for (const target of queries) {
					sink += findNearestRGBColour(target, palette).R;
				}
				return sink;
			});

			await bench(`prepare + ${queryCount} lookups (${size} colours)`, () => {
				const matcher = preparePalette(palette);
				for (const target of queries) {
					sink += matcher(target)?.R ?? 0;
				}
				return sink;
			});
		}
	}
});
