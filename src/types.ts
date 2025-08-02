/**
 * The HSV colour model represents colours by describing the Hue, Saturation, and Value channels.
 */
export interface HSVColour {
	/** A number between 0 and 360 to describe the Hue channel */
	h: number;
	/** A number between 0 and 1 to describe the Saturation channel */
	s: number;
	/** A number between 0 and 1 to describe the Value channel */
	v: number;
}
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
	/** A number between -128 and 127 to describe the green–red opponent colours, with negative values toward green and positive values toward red */
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
	| "aqua"
	| "aquamarine"
	| "azure"
	| "beige"
	| "bisque"
	| "black"
	| "blanchedalmond"
	| "blue"
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
	| "fuchsia"
	| "gainsboro"
	| "ghostwhite"
	| "gold"
	| "goldenrod"
	| "gray"
	| "green"
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
	| "lime"
	| "limegreen"
	| "linen"
	| "magenta"
	| "maroon"
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
	| "navy"
	| "oldlace"
	| "olive"
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
	| "purple"
	| "red"
	| "rosybrown"
	| "royalblue"
	| "saddlebrown"
	| "salmon"
	| "sandybrown"
	| "seagreen"
	| "seashell"
	| "sienna"
	| "silver"
	| "skyblue"
	| "slateblue"
	| "slategray"
	| "slategrey"
	| "snow"
	| "springgreen"
	| "steelblue"
	| "tan"
	| "teal"
	| "thistle"
	| "tomato"
	| "transparent"
	| "turquoise"
	| "violet"
	| "wheat"
	| "white"
	| "whitesmoke"
	| "yellow"
	| "yellowgreen";

export type NamedCSSColours = Array<[NamedCSSColour, string]>;
