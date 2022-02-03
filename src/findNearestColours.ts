import type { RGBColour } from "./colour.interface";
import { RGBdistance } from "./RGBdistance";

export function findNearestColours(
  colours: RGBColour[],
  palette: RGBColour[]
): RGBColour[] {
  const setColour: RGBColour[] = [];
  const colourWeakMap = new WeakMap();
  for (const colour of colours) {
    if (colourWeakMap.has(colour)) {
      setColour.push(colourWeakMap.get(colour));
    } else {
      const map = [];
      for (let i = 0; i < palette.length; i++) {
        const brickColour = palette[i] as RGBColour;
        const distance = RGBdistance(colour, brickColour);
        map.push([brickColour, distance]);
      }
      const closest = map.sort((a, b) => a[1] - b[1])[0][0];
      setColour.push(closest);
      colourWeakMap.set(colour, closest);
    }
  }
  return setColour;
}
