import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "dist",
		target: "es2020",
		minify: true,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es", "cjs", "umd"],
			name: "Colour",
			// ESM will be .mjs and CJS will be .cjs
			fileName: (format, entryName) => {
				const extension = format === "es" ? "mjs" : format;
				if (format === "umd") {
					return `${entryName}.min.js`;
				}
				return `${entryName}.${extension}`;
			},
		},
	},
});
