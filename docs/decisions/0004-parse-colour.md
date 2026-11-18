# 0004. Add `parseColour(unknown)`

- Status: Accepted for 5.0.0
- Date: 2026-11-18
- Issue: #495 (tracker #490), decision D9
- Implemented in: `feat/issue-495-contract`

## Context

With [0003](0003-failable-apis-return-null.md), predicates return `false` for
invalid input, so callers need a way to check a value first. Each format also
had its own entry point and no function accepted RGB objects from untrusted
input. The addition doesn't need a major version, but shipping it in 5.0.0 gives
callers the validation route on the same release that removes the exceptions.

## Decision

`parseColour(colour: unknown): RGBColour | null`:

- Strings: hex (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`), the CSS RGB forms
  already accepted by `isCSSRGBColour`, and exact lowercase named CSS colours.
  There's no trimming and no new CSS grammar.
- RGB objects: `R`, `G` and `B` must be finite numbers. Alpha may be missing or
  `undefined`, which means opaque and is left out of the result; otherwise it
  must be a finite number. Missing, non-numeric or non-finite values return
  `null`. Extra properties are ignored.
- Finite out-of-range values are clamped: channels to 0–255, alpha to 0–1.
  Fractions are kept.
- Always returns a new object and never mutates the input.
- Built on the existing leaf parsers, regexes and the named-colour map, without
  circular delegation.

## Consequences

- `getContrastRatio` uses `parseColour` for its string operands
  ([0007](0007-generic-contrast-via-rgb.md)), but it still accepts only
  strings.
- Specialized functions keep their lightweight format-specific paths. They don't
  route through `parseColour`.
