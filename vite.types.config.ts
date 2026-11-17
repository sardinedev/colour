import { resolve } from "node:path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		dts({
			bundleTypes: true,
			declarationOnly: true,
			entryRoot: resolve(__dirname, "src"),
			exclude: ["src/**/*.test.ts"],
			outDirs: [resolve(__dirname, "dist")],
			tsconfigPath: resolve(__dirname, "tsconfig.emit.json"),
		}),
	],
	build: {
		outDir: "dist",
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
			fileName: (_format, entryName) => `${entryName}.mjs`,
		},
	},
});
