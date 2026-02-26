/** Any valid hexadecimal colour: 3, 4, 6, or 8 hex digits after `#` */
export const hexAnyRegex =
	/^#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})$/;
/**
 * Captures the following CSS RGB formats:
 * - `rgb(0,0,0)`
 * - `rgba(0, 0, 0, 0.4)`
 * - `rgba(0,0,0,50%)`
 * - `rgb(0 0 0)`
 * - `rgba(0 0 0 / 0.4)`
 * - `rgb(0 0 0 / 0.5)`
 * - `rgb(0 0 0 / 50%)`
 * - `rgb(50%, 25%, 100%)`
 * - `rgba(50%, 25%, 100%, 0.8)`
 * - `rgba(50%, 25%, 100%, 80%)`
 */
export const cssRGBARegex =
	/^rgba?\(\s*([-+]?\d*\.?\d+%?)\s*[,\s]\s*([-+]?\d*\.?\d+%?)\s*[,\s]\s*([-+]?\d*\.?\d+%?)\s*(?:[,/]\s*([-+]?\d*\.?\d+%?))?\s*\)$/i;
