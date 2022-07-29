/**
 * The RGB colour model represents a broad array of colours by describing the Red, Green and Blue channels.
 */
export interface RGBColour {
  /** A number between 0 and 255 to describe the Red colour channel */
  R: number;
  /** A number between 0 and 255 to describe the Green colour channel */
  G: number;
  /** A number between 0 and 255 to describe the Blue colour channel */
  B: number;
  /** A optional number between 0 and 1 to describe the Alpha colour channel */
  A?: number;
}

/**
 * L*a*b* space is three-dimensional and covers the entire range of human colour perception
 */
export interface LabColour {
  /** A number between 0 and 100 to describe the colour's lightness. (0 - black, 100 - white)  */
  L: number;
  /** A number between -128 and 127 to describe the green–red opponent colors, with negative values toward green and positive values toward red */
  a: number;
  /** A number between -128 and 127 to describe  blue–yellow opponents, with negative numbers toward blue and positive toward yellow */
  b: number;
}

/**
 * The CIE XYZ colour space is a device independent colour representation
 */
export interface XYZColour {
  /** X is a mix of response curves chosen to be nonnegative */
  X: number;
  /** Y as luminance */
  Y: number;
  /** Z is quasi-equal to blue */
  Z: number;
}

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

export type ColourSpace = "sRGB";
