import { resolve } from "node:path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "dist",
		target: "es2020",
		minify: false,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es", "cjs"],
			// ESM will be .mjs and CJS will be .cjs
			fileName: (format, entryName) => {
				const extension = format === "es" ? "mjs" : format;
				return `${entryName}.${extension}`;
			},
		},
	},
});
