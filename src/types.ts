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
	A?: number | undefined;
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

export type WCAG = "WCAG2.1" | "WCAG3.0";

/**
 * Named list from https://developer.mozilla.org/en-US/docs/Web/CSS/named-color
 */
export type NamedCSSColour =
	| "aliceblue"
	| "antiquewhite"
	| "aquamarine"
	| "azure"
	| "beige"
	| "bisque"
	| "blanchedalmond"
	| "blueviolet"
	| "brown"
	| "burlywood"
	| "cadetblue"
	| "chartreuse"
	| "chocolate"
	| "coral"
	| "cornflowerblue"
	| "cornsilk"
	| "crimson"
	| "cyan"
	| "darkblue"
	| "darkcyan"
	| "darkgoldenrod"
	| "darkgray"
	| "darkgreen"
	| "darkgrey"
	| "darkkhaki"
	| "darkmagenta"
	| "darkolivegreen"
	| "darkorange"
	| "darkorchid"
	| "darkred"
	| "darksalmon"
	| "darkseagreen"
	| "darkslateblue"
	| "darkslategray"
	| "darkslategrey"
	| "darkturquoise"
	| "darkviolet"
	| "deeppink"
	| "deepskyblue"
	| "dimgray"
	| "dimgrey"
	| "dodgerblue"
	| "firebrick"
	| "floralwhite"
	| "forestgreen"
	| "gainsboro"
	| "ghostwhite"
	| "gold"
	| "goldenrod"
	| "greenyellow"
	| "grey"
	| "honeydew"
	| "hotpink"
	| "indianred"
	| "indigo"
	| "ivory"
	| "khaki"
	| "lavender"
	| "lavenderblush"
	| "lawngreen"
	| "lemonchiffon"
	| "lightblue"
	| "lightcoral"
	| "lightcyan"
	| "lightgoldenrodyellow"
	| "lightgray"
	| "lightgreen"
	| "lightgrey"
	| "lightpink"
	| "lightsalmon"
	| "lightseagreen"
	| "lightskyblue"
	| "lightslategray"
	| "lightslategrey"
	| "lightsteelblue"
	| "lightyellow"
	| "limegreen"
	| "linen"
	| "magenta"
	| "mediumaquamarine"
	| "mediumblue"
	| "mediumorchid"
	| "mediumpurple"
	| "mediumseagreen"
	| "mediumslateblue"
	| "mediumspringgreen"
	| "mediumturquoise"
	| "mediumvioletred"
	| "midnightblue"
	| "mintcream"
	| "mistyrose"
	| "moccasin"
	| "navajowhite"
	| "oldlace"
	| "olivedrab"
	| "orangered"
	| "orchid"
	| "palegoldenrod"
	| "palegreen"
	| "paleturquoise"
	| "palevioletred"
	| "papayawhip"
	| "peachpuff"
	| "peru"
	| "pink"
	| "plum"
	| "powderblue"
	| "rosybrown"
	| "royalblue"
	| "saddlebrown"
	| "salmon"
	| "sandybrown"
	| "seagreen"
	| "seashell"
	| "sienna"
	| "skyblue"
	| "slateblue"
	| "slategray"
	| "slategrey"
	| "snow"
	| "springgreen"
	| "steelblue"
	| "tan"
	| "thistle"
	| "tomato"
	| "transparent"
	| "turquoise"
	| "violet"
	| "wheat"
	| "whitesmoke"
	| "yellowgreen";

export type NamedCSSColours = Array<[NamedCSSColour, string]>;
