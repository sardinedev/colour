---

## "@sardine/colour": major

Invalid input now returns `null` instead of throwing or returning `undefined`, and the darkness predicates return `false`. Contrast ratios, hex alpha and CSS percentage channels keep full precision, and out-of-range CSS RGB values are clamped. Adds `parseColour` and exports `RGBColour`, `LabColour`, `XYZColour`, `NamedCSSColour` and `PickHexColourContrastOptions` from the package root. See the [v4 to v5 migration guide](https://github.com/sardinedev/colour/blob/main/docs/migrations/v4tov5.md).
