# Decision records

Short records of decisions that shape the public API, packaging or numerical
behaviour of `@sardine/colour`. Each record explains what was decided, why, and
what it means for callers and contributors. Discussion happens in GitHub issues;
these files keep the outcome findable from the code.

| # | Decision | Status | Release | Issue |
| - | -------- | ------ | ------- | ----- |
| [0001](0001-esm-only-distribution.md) | Publish ESM only | Accepted, implemented | 5.0.0 | #492 |
| [0002](0002-wcag-2x-only.md) | One WCAG 2.x calculation, no standard selection | Accepted, implemented | 5.0.0 | #493 |
| [0003](0003-failable-apis-return-null.md) | Failable APIs return `null`; predicates return `false` | Accepted | 5.0.0 | #495 |
| [0004](0004-parse-colour.md) | Add `parseColour(unknown)` | Accepted | 5.0.0 | #495 |
| [0005](0005-full-numeric-precision.md) | Keep full numeric precision; quantize only when serializing | Accepted | 5.0.0 | #495 |
| [0006](0006-clamp-css-rgb.md) | Clamp CSS RGB values like CSS computed values | Accepted | 5.0.0 | #495 |
| [0007](0007-generic-contrast-via-rgb.md) | Generic contrast measures RGB directly | Accepted | 5.0.0 | #495 |
| [0008](0008-public-types-and-named-colour-guard.md) | Export public types; `isNamedCSSColour` accepts any string | Accepted | 5.0.0 | #495 |
| [0009](0009-palette-match-results.md) | Palette matching returns the original entry, or `null` | Accepted | 5.0.0 | #496 |
| [0010](0010-prepared-palettes.md) | Prepared palettes for repeated matching | Accepted | 5.0.0 | #499 |

Open proposals that are not decided yet are tracked in #490 (for example #497
alpha compositing). They get a
record here once accepted, rejected or deferred.

## Adding a record

Copy the template below into the next free number, `NNNN-short-title.md`, and
add a row to the table. Don't rewrite an accepted record to change the decision:
add a new one and mark the old one `Superseded by NNNN`.

```md
# NNNN. Title

- Status: Proposed | Accepted | Rejected | Deferred | Superseded by NNNN
- Date: YYYY-MM-DD
- Issue: #NNN
- Implemented in: #NNN

## Context

What problem or inconsistency prompted this, with evidence.

## Decision

What we will do, stated precisely enough to test.

## Consequences

What changes for callers (including migration) and for contributors.
Note what is explicitly out of scope.
```
