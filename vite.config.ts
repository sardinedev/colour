import { resolve } from "node:path";
import dts from "unplugin-dts/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const emitTypes = mode === "types";

	return {
		plugins: emitTypes
			? [
					dts({
						bundleTypes: true,
						declarationOnly: true,
						entryRoot: resolve(__dirname, "src"),
						exclude: ["src/**/*.test.ts"],
						outDirs: [resolve(__dirname, "dist")],
						tsconfigPath: resolve(__dirname, "tsconfig.emit.json"),
					}),
				]
			: [],
		build: {
			emptyOutDir: !emitTypes,
			outDir: "dist",
			target: "es2020",
			minify: false,
			lib: {
				entry: resolve(__dirname, "src/index.ts"),
				formats: ["es"],
				fileName: (_format, entryName) => `${entryName}.mjs`,
			},
		},
	};
});
