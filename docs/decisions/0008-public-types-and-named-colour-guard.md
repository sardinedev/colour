# 0008. Export public types; `isNamedCSSColour` accepts any string

- Status: Accepted
- Date: 2026-11-18
- Issue: #495 (tracker #490), decisions D3 and D4
- Implemented in: `feat/issue-495-contract`

## Context

`src/index.ts` exported no types, so consumers could not name `RGBColour` or
`NamedCSSColour` without deep imports. `pickHexColourContrast` took a private
`ColorArgs` type. `isNamedCSSColour` was declared as
`(colour: NamedCSSColour) => colour is NamedCSSColour`, so passing it an
ordinary `string` was a type error, which made the guard useless for untrusted
input.

## Decision

- Export these types from the package root: `RGBColour`, `LabColour`,
  `XYZColour`, `NamedCSSColour`, and `PickHexColourContrastOptions` (renamed
  from the private `ColorArgs`).
- Keep internal helpers private: `HueHelper`, `HSVColour` (`convertRGBtoHSV`
  isn't exported) and `NamedCSSColours`. Delete the unused `ColourSpace` type.
- `isNamedCSSColour(colour: string): colour is NamedCSSColour`. Matching stays
  exact against the canonical lowercase names, so `"Red"` is not narrowed and
  the narrowing stays sound.
- The other named-colour functions keep their `NamedCSSColour` parameters.

## Consequences

- `import { type RGBColour, parseColour } from "@sardine/colour"` works under
  strict `NodeNext` and `bundler` resolution. A packed-tarball consumer check
  confirms it.
- Code that relied on `@ts-expect-error` when passing plain strings to
  `isNamedCSSColour` no longer needs it.
- CSS colour names are case-insensitive in browsers but not here. Changing that
  would need its own decision, because it affects narrowing and the lookup
  functions.
