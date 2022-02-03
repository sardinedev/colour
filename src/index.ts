import { RGBColour } from "./colour.interface";
import { ciede2000 } from "./util/CIEDE2000";
import { convertRGBtoLab } from "./util/converters";

export const nearest = (colour1: RGBColour, colour2: RGBColour): number => {
  const c1 = convertRGBtoLab(colour1);
  const c2 = convertRGBtoLab(colour2);

  return ciede2000(c1, c2);
};

export const findNearestColours = (
  colours: RGBColour[],
  palette: RGBColour[]
): RGBColour[] => {
  const setColour: RGBColour[] = [];
  const colourWeakMap = new WeakMap();
  for (const colour of colours) {
    if (colourWeakMap.has(colour)) {
      setColour.push(colourWeakMap.get(colour));
    } else {
      const map = [];
      for (let i = 0; i < palette.length; i++) {
        const brickColour = palette[i] as RGBColour;
        const distance = nearest(colour, brickColour);
        map.push([brickColour, distance]);
      }
      const closest = map.sort((a, b) => a[1] - b[1])[0][0];
      setColour.push(closest);
      colourWeakMap.set(colour, closest);
    }
  }
  return setColour;
};
