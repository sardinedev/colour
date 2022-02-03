export interface HueHelper {
  /** Chroma for colour 1 */
  C1: number;
  /** Chroma for colour 2 */
  C2: number;
  /** Derivative of colour 1 Hue */
  h1_d: number;
  /** Derivative of colour 2 Hue */
  h2_d: number;
}

/**
 * Calculates the Hue derivative
 * @param x A numeric expression representing the cartesian x-coordinate.
 * @param y A numeric expression representing the cartesian y-coordinate.
 */
export function hue_d(x: number, y: number): number {
  // early exit if both values are 0
  if (x === 0 && y === 0) {
    return 0;
  }
  /** The angle in degrees */
  const angle = Math.atan2(x, y) * (180 / Math.PI);
  if (angle >= 0) {
    return angle;
  }
  return angle + 360;
}

/**
 * Calculates the difference between two Hue derivatives
 * @param HueHelper param
 */
export function deltaHue_d({ C1, C2, h1_d, h2_d }: HueHelper): number {
  if (C1 * C2 === 0) {
    return 0;
  }
  if (Math.abs(h2_d - h1_d) <= 180) {
    return h2_d - h1_d;
  }
  if (h2_d - h1_d > 180) {
    return h2_d - h1_d - 360;
  }
  if (h2_d - h1_d < -180) {
    return h2_d - h1_d + 360;
  }
}

/**
 * Calculates the mean between two Hue derivatives
 * @param HueHelper param
 */
export function meanHue_d({ C1, C2, h1_d, h2_d }: HueHelper): number {
  if (C1 * C2 === 0) {
    return h2_d + h1_d;
  }
  if (Math.abs(h1_d - h2_d) <= 180) {
    return (h2_d + h1_d) / 2;
  }
  if (Math.abs(h1_d - h2_d) > 180 && h1_d + h2_d < 360) {
    return (h2_d + h1_d + 360) / 2;
  }
  if (Math.abs(h1_d - h2_d) > 180 && h1_d + h2_d >= 360) {
    return (h2_d + h1_d - 360) / 2;
  }
}

/**
 * Converts a number in degrees to radians
 * @param n Number in degrees to be converted
 */
export const toRadians = (n: number): number => n * (Math.PI / 180);

/**
 * Calculates a recurring square root
 * @param n Input number
 */
export const bigSquare = (n: number): number =>
  Math.sqrt(Math.pow(n, 7) / (Math.pow(n, 7) + Math.pow(25, 7)));

/**
 * Normalise black and white colorimetry as specified in IEC 61966-2-1
 * @param n number to be normalised
 */
export function reverseTransformation(n: number) {
  let u: number;

  if (n > 0.04045) {
    u = Math.pow((n + 0.055) / 1.055, 2.4);
  } else {
    u = n / 12.92;
  }

  return u;
}

/**
 * The division of the f function domain into two parts was done to prevent an infinite slope at n = 0
 * @param n Number to be constrained
 */
export function constrainLab(n: number): number {
  const delta = 6 / 29;
  const deltaCube = Math.pow(delta, 3);
  let t: number;

  if (n > deltaCube) {
    t = Math.cbrt(n);
  } else {
    t = n / (3 * Math.pow(delta, 2)) + 4 / 29;
  }

  return t;
}
