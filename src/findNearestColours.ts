import { RGBdistance } from "./RGBdistance.js";
import type  { RGBColour } from "./converters";

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
      const distanceMap: number[]  = [];
      for (let i = 0; i < palette.length; i++) {
        const brickColour = palette[i] as RGBColour;
        const distance = RGBdistance(colour, brickColour);
        distanceMap.push(distance);
      }
      const closestIndex = distanceMap.findIndex(el => el === Math.min(...distanceMap));
      const closest = palette[closestIndex] as RGBColour;
      setColour.push(closest);
      colourWeakMap.set(colour, closest);
    }
  }
  return setColour;
}
