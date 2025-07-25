import { describe, expect, it } from "vitest";
import { sortHexColours } from "./sortHexColours";

describe("sortHexColours", () => {
	it("sorts colours by hue then saturation", () => {
		const input = [
			"#ff0000", // red
			"#00ff00", // green
			"#0000ff", // blue
			"#ffff00", // yellow
			"#00ffff", // cyan
			"#ff00ff", // magenta
		];
		const sorted = sortHexColours(input);
		expect(sorted[0]).toBe("#ff0000"); // red (hue 0)
		expect(sorted[1]).toBe("#ffff00"); // yellow (hue 60)
		expect(sorted[2]).toBe("#00ff00"); // green (hue 120)
		expect(sorted[3]).toBe("#00ffff"); // cyan (hue 180)
		expect(sorted[4]).toBe("#0000ff"); // blue (hue 240)
		expect(sorted[5]).toBe("#ff00ff"); // magenta (hue 300)
	});

	it("moves greyscale colours to the end", () => {
		const input = [
			"#ff0000", // red
			"#808080", // grey
			"#000000", // black
			"#ffffff", // white
		];
		const sorted = sortHexColours(input);
		expect(sorted.slice(-3)).toEqual(["#808080", "#000000", "#ffffff"]);
	});

	it("moves fully transparent colours to the very end", () => {
		const input = [
			"#ff0000", // red
			"#00ff00", // green
			"#00000000", // transparent black
			"#ffffffff", // transparent white
		];
		const sorted = sortHexColours(input);
		expect(sorted.slice(-2)).toEqual(["#00000000", "#ffffffff"]);
	});

	it("handles mixed input formats", () => {
		const input = ["#ff0000", "#808080", "#00000000", "#00ff00", "#ffffff"];
		const sorted = sortHexColours(input);
		expect(sorted[0]).toBe("#ff0000");
		expect(sorted[1]).toBe("#00ff00");
		expect(sorted.slice(-3)).toEqual(["#808080", "#ffffff", "#00000000"]);
	});
});
