import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			reporter: ["text", "lcovonly"],
			provider: "v8",
		},
	},
});
