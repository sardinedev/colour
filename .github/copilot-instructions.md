# Copilot instructions (@sardine/colour)

## Project context
- This is a small, pure TypeScript colour utility library (no runtime deps) published as ESM + CJS (+ a minified unpkg build in CI).
- Source lives in `src/` as many small, single-purpose functions (e.g. `convertRGBtoHex`, `getContrastRatioFromHex`, `findNearestColour`).
- Public API is the barrel export in `src/index.ts`. Add new exports there when adding a new utility.

## Ground rules (keep it small)
- Prefer minimal, discoverable changes; don’t introduce new dependencies unless unavoidable.
- Don’t document/assume paths that aren’t in the repo; verify by searching first.
- Keep edits consistent with existing style: TypeScript uses **tabs** for indentation (see `.editorconfig`).

## Dev workflow (source of truth)
- Node: Check `.nvmrc` for which Node version to use; CI runs tests for the current Node LTS and the last two versions too and `package.json` requires `>=20`.
- Install: `npm ci` (CI) or `npm install` (local).
- Tests: `npm run test` (Vitest + coverage).
- Static checks: `npm run static` (Biome). Typecheck: `npm run types:check`.
- Build artifacts:
  - JS bundles: `npm run build` (Vite library mode → `dist/*.mjs` + `dist/*.cjs`, no minify).
  - Types: `npm run types:emit` (tsc emits `.d.ts` only).

## Code patterns to follow
- “Normalize → compute → convert back” is common:
  - Example: `findNearestColour` normalizes inputs using `isHexColour`/`isCSSRGBColour`/`isNamedCSSColour`, converts to RGB, does math, then returns the original format.
  - Example: `getContrastRatio` normalizes multiple input formats to hex, then delegates to `getContrastRatioFromHex`.
- Prefer shared helpers from `src/util/` (e.g. `clamp` in `src/util/index.ts`) instead of duplicating math/guards.
- Types are in `src/types.ts` and use channel names `R/G/B` (and optional `A`). Keep those shapes consistent.
- Input validation is typically done via regex/assertion helpers in `src/assertions.ts` + `src/util/regexers.ts`.

## Testing conventions
- Tests are colocated as `*.test.ts` next to the implementation and use Vitest (`import { expect, test } from "vitest"`).
- When changing parsing/conversion logic, add/adjust table-style test cases to cover edge formats (hex short/alpha, CSS rgb/rgba with commas/spaces/slash, percent channels).

## Adding a new utility
1. Create `src/<utilityName>.ts` with a single exported function following existing naming (e.g. `convertXtoY`, `isXColour`, `getX`).
2. Add a colocated `src/<utilityName>.test.ts` with representative test cases.
3. Export the function from `src/index.ts`.
4. Run `npm run test` and `npm run static` before committing.

## Git hooks
- Lefthook runs Biome checks on pre-push (see `lefthook.yml`). If the push is rejected, run `npm run static` locally to see issues.
