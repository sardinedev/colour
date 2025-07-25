/** Six digit Hexadecimal colour, ie: #12FF21 */
export const hexRegex = /^#[a-fA-F0-9]{6}$/;
/** Eight digit Hexadecimal colour, ie: #12FF21BE */
export const hexAlphaRegex = /^#[a-fA-F0-9]{8}$/;
/** Three digit Hexadecimal colour, ie: #FFF */
export const shortHexRegex = /^#[a-fA-F0-9]{3}$/;
/** Four digit Hexadecimal colour, ie: #FFF4 */
export const shortAlphaHexRegex = /^#[a-fA-F0-9]{4}$/;
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
