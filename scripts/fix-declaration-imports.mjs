import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function fixDeclarationImports(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			await fixDeclarationImports(path);
		} else if (entry.name.endsWith(".d.ts")) {
			const declaration = await readFile(path, "utf8");
			const updated = declaration.replace(
				/\bfrom\s+(["'])(\.{1,2}\/[^"']+)\1/g,
				(match, quote, specifier) =>
					/\.(?:c|m)?js$/.test(specifier)
						? match
						: `from ${quote}${specifier}.js${quote}`,
			);
			if (updated !== declaration) await writeFile(path, updated);
		}
	}
}

await fixDeclarationImports("dist");
