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
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.mjs`,
		},
	},
});
