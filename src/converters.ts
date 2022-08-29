import type { LabColour, NamedCSSColour, RGBColour, XYZColour } from "./types";
import { clamp, constrainLab, linearRGB } from "./util/index.js";
import { namedCSSColours } from "./util/namedCSSColours.js";
import { cssRGBARegex, hexAlphaRegex, hexRegex, shortAlphaHexRegex, shortHexRegex } from "./util/regexers.js";

/**
 * Converts sRGB colour space to XYZ.
 * Math comes from https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
 * @param {RGBColour} colour sRGB colour
 * @return {XYZColour} XYZ colour
 */
export function convertRGBtoXYZ(colour: RGBColour): XYZColour {
  const { R, G, B } = colour;

  const _R = linearRGB(R) * 100;
  const _G = linearRGB(G) * 100;
  const _B = linearRGB(B) * 100;

  // Magic numbers are pre-calculated sRGB D65 constants
  const X = _R * 0.4124 + _G * 0.3576 + _B * 0.1805;
  const Y = _R * 0.2126 + _G * 0.7152 + _B * 0.0722;
  const Z = _R * 0.0193 + _G * 0.1192 + _B * 0.9505;

  return { X, Y, Z };
}

/**
 * Converts XYZ colour space to Lab
 * Math comes from https://en.wikipedia.org/wiki/CIELAB_color_space#From_CIEXYZ_to_CIELAB[11]
 * @param colour XYZ colour
 * @return {LabColour} Lab colour
 */
export function convertXYZtoLab(colour: XYZColour): LabColour {
  const { X, Y, Z } = colour;

  // Magic numbers are normalised for relative luminance from the D65 standard
  const _X = X / 95.047;
  const _Y = Y / 100;
  const _Z = Z / 108.883;

  const fX = constrainLab(_X);
  const fY = constrainLab(_Y);
  const fZ = constrainLab(_Z);

  const L = 116 * fY - 16;
  const a = 500 * (fX - fY);
  const b = 200 * (fY - fZ);

  return { L, a, b };
}

/**
 * Indirectly converts RGB to Lab.
 * First converts RGB to XYZ, then converts XYZ to Lab.
 * @param {RGBColour} colour sRGB colour
 * @return {LabColour} Lab colour
 */
export function convertRGBtoLab(colour: RGBColour): LabColour {
  const XYZColour = convertRGBtoXYZ(colour);
  return convertXYZtoLab(XYZColour);
}

/**
 * Converts a colour in the RGB format to Hexadecimal.
 * It accepts an option Alpha channel `A`
 * @param {RGBColour} colour - An object representing RGB Colour.
 * @param {number} colour.R - A number between 0 and 255 to describe the Red colour channel
 * @param {number} colour.G - A number between 0 and 255 to describe the Green colour channel
 * @param {number} colour.B - A number between 0 and 255 to describe the Blue colour channel
 * @param {number} colour.A - An optional number between 0 and 1 to describe the Alpha colour channel
 * @returns - An hexadecimal string 
 */
export function convertRGBtoHex({R, G, B, A}: RGBColour): string {
  const hex = (n: number) =>{
    const value = clamp(n, 0, 255);
    return value.toString(16).padStart(2, '0')
  };
  return `#${hex(R)}${hex(G)}${hex(B)}${(A ? hex(Math.round(A * 255)) : '')}`;
}

/**
 * Converts CSS RGB colour format into Hexadecimal.
 * @param {string} colour - A CSS RGB colour in the format:
 * 
 * - `rgb(0,0,0)`
 * - `rgba(0,0,0,0.4)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * 
 * @returns {string} - An hexadecimal string 
 */
export function convertCSSRGBtoHex(colour:string): string {
  const rgb: RGBColour = convertCSSRGBtoRGB(colour);
  return convertRGBtoHex(rgb);
}

/**
 * Converts CSS RGB colour format into RGB colour object.
 * @param {string} colour - A CSS RGB colour in the format:
 * 
 * - `rgb(0,0,0)`
 * - `rgba(0,0,0,0.4)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * 
 * @returns {RGBColour} - RGB colour object. 
 */
export function convertCSSRGBtoRGB(colour: string): RGBColour {
  const match = colour.match(cssRGBARegex);
  if (!match) { throw new Error(`convertCSSRGBtoHex expects a valid CSS RGB string but got ${colour}`)}
  const rgbNumber = (n: string) : number => parseInt(n, 10);
  const alphaNumber = (n: string) : number => parseFloat(n) ?? undefined;
  return {
    R:rgbNumber(match[1] as string),
    G:rgbNumber(match[2] as string), 
    B:rgbNumber(match[3] as string), 
    A:alphaNumber(match[4] as string)
  };
}

/**
 * Converts an hexadecimal colour into RGB colour object.
 * @param {string} hex - An hexadecimal colour in the format:
 * 
 * - `#000`
 * - `#102030`
 * - `#ffff`
 * - `#102030ff`
 * 
 * @returns {RGBColour} - RGB colour object. 
 */
export function convertHextoRGB(hex: string): RGBColour {
  if (typeof hex !== "string") {
    throw new Error(`convertHextoRGB expects a string but got a ${typeof hex}`);
  }

  if (hex.match(hexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[2]}`, 16),
      G: parseInt(`${hex[3]}${hex[4]}`, 16),
      B: parseInt(`${hex[5]}${hex[6]}`, 16),
    };
  }

  if (hex.match(shortHexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[1]}`, 16),
      G: parseInt(`${hex[2]}${hex[2]}`, 16),
      B: parseInt(`${hex[3]}${hex[3]}`, 16),
    };
  }

  if (hex.match(hexAlphaRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[2]}`, 16),
      G: parseInt(`${hex[3]}${hex[4]}`, 16),
      B: parseInt(`${hex[5]}${hex[6]}`, 16),
      A: parseInt(`${hex[7]}${hex[8]}`, 16) / 255,
    };
  }

  if (hex.match(shortAlphaHexRegex)) {
    return {
      R: parseInt(`${hex[1]}${hex[1]}`, 16),
      G: parseInt(`${hex[2]}${hex[2]}`, 16),
      B: parseInt(`${hex[3]}${hex[3]}`, 16),
      A: parseInt(`${hex[4]}${hex[4]}`, 16) / 255,
    };
  }

  throw new Error(
    `convertHextoRGB expects an valid hexadecimal colour value but got ${hex}`
  );
}

/**
 * Converts a named CSS Colour in an hexadecimal one.
 * 
 * List of colours sourced here:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 * @param {NamedCSSColour} name - A named CSS colour
 * @returns {string} - An hexadecimal string 
 */
export function convertNamedCSSColourtoHex(name: NamedCSSColour): string | undefined {
  return namedCSSColours.get(name);
}