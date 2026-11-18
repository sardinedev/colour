# 0005. Keep full numeric precision; quantize only when serializing

- Status: Accepted
- Date: 2026-11-18
- Issue: #495 (tracker #490), decisions D5, D6 and D7
- Implemented in: `feat/issue-495-contract`

## Context

v4 rounded values at several points inside the library:

- `convertHextoRGB` rounded alpha to 2 decimals, so `#00000001` became `A: 0`.
- `convertCSSRGBtoRGB` rounded percentage channels (`50.2%` became `128`).
- `calculateContrastRatio` truncated ratios to 3 decimals.

Each step lost information that later steps could not recover, and display
formatting ended up mixed with calculation.

## Decision

- **Contrast (D5):** ratios are returned unrounded. Black on white is exactly
  `21`, and identical colours give exactly `1`.
- **Hex alpha (D6):** alpha is stored as `byte / 255` without rounding. It is
  quantized only when serializing:
  - `convertRGBtoHex` writes the nearest byte (since #532).
  - `convertHextoCSSRGB` writes the shortest of 2 or 3 decimals that maps back
    to the same byte, as browsers do (`#00000080` becomes `0.5` and `#00000001`
    becomes `0.004`).
  - `convertRGBtoCSSRGB` writes the caller's value as given.
- **CSS percentages (D7):** channels keep their fractions (`50%` becomes
  `127.5`). They're computed as `percentage * 255 / 100` so exact inputs stay
  exact (`2%` gives `5.1`, not `5.1000000000000005`).

## Consequences

- Display rounding is the caller's job, for example `ratio.toFixed(2)`.
- Truncation never rounded up, so it never made a failing pair pass a threshold
  such as 4.5. Unrounded values are equally safe at thresholds, and more
  precise.
- Changed outputs callers may notice:
  - `getContrastRatio("#777", "#fff")` returns `4.478089…` instead of `4.478`.
  - `convertHextoRGB("#00000080").A` is `0.50196…` instead of `0.5`.
  - `convertCSSRGBtoRGB("rgb(50% 25% 100%)")` returns
    `{ R: 127.5, G: 63.75, B: 255 }`.
- Tests cover all 256 long-hex alpha bytes and the 16 shorthand values. Each one
  must survive hex → RGB → hex and hex → CSS → RGB → hex unchanged.
- `findNearestCSSRGBColour` re-serializes its result, so it can now return
  fractional channels such as `rgb(5.1 5.1 5.1)`, until #496 decides whether to
  return the original palette entry.
