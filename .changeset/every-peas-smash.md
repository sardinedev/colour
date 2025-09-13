---
"@sardine/colour": minor
---

Add sortHexColours function for colour sorting

This release introduces the new `sortHexColours()` function that provides intelligent sorting of hex colour arrays with support for multiple colour types and custom ordering logic.

### New Features
- **Hue-based sorting**: Primary sort by hue (0° to 360°), then by saturation (descending)
- **Greyscale handling**: Colours with 0% saturation are moved to the end with custom ordering
- **Transparent support**: Fully transparent colours (alpha = 0) are placed at the very end
- **Multi-format support**: Accepts both 6-digit (`#RRGGBB`) and 8-digit (`#RRGGBBAA`) hex formats

### Sorting Behavior
1. **Normal colours**: Sorted by hue first, then by descending saturation
2. **Greyscale colours**: Custom ordering - grey shades first, then black, then white
3. **Transparent colours**: Sorted by brightness value (darkest to lightest)

### Usage Example
```typescript
import { sortHexColours } from '@sardine/colour';

const colors = [
  '#ff0000',    // red
  '#00ff00',    // green  
  '#808080',    // gray
  '#000000',    // black
  '#ffffff',    // white
  '#00000000'   // transparent black
];

const sorted = sortHexColours(colors);
// Result: ['#ff0000', '#00ff00', '#808080', '#000000', '#ffffff', '#00000000']
```

### Supported Hex Formats
- `#RGB` - 3-digit hex (expanded to 6-digit)
- `#RRGGBB` - 6-digit hex colors
- `#RGBA` - 4-digit hex with alpha (expanded to 8-digit)
- `#RRGGBBAA` - 8-digit hex with alpha channel

