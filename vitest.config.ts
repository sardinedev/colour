import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [codspeedPlugin()],
	test: {
		coverage: {
			reporter: ["text", "lcovonly"],
			provider: "v8",
		},
	},
});
