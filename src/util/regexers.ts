/** Six digit Hexadecimal colour, ie: #12FF21 */
export const hexRegex = /^#[a-fA-F0-9]{6}$/;
/** Eight digit Hexadecimal colour, ie: #12FF21BE */
export const hexAlphaRegex = /^#[a-fA-F0-9]{8}$/;
/** Three digit Hexadecimal colour, ie: #FFF */
export const shortHexRegex = /^#[a-fA-F0-9]{3}$/;
/** Four digit Hexadecimal colour, ie: #FFF4 */
export const shortAlphaHexRegex = /^#[a-fA-F0-9]{4}$/;
/** CSS RGB with optional alpha channel, ie: rgb(23, 213, 11) or rgba(12,34,12,0.2) */
export const cssRGBARegex =
	/^rgba*\(\s*([-+]?\d+)\s*(?:,)?\s*([-+]?\d+)\s*(?:,)?\s*([-+]?\d+)\s*(?:,*|\/*)\s*([-+]?\d*[.]?\d+[%]?)*\)$/i;
