import { defineConfig } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "dist",
		target: "es2020",
		minify: true,
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			// ESM will be .mjs and CJS will be .cjs
			fileName: (format, entryName) => {
				const extension = format === "es" ? "mjs" : format;
				return `${entryName}.${extension}`;
			},
			formats: ["es", "cjs"],
		},
	},
});
