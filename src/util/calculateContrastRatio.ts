/**
 * Calculate the contrast ratio between two colours
 * @param luminance1 The luminance of the first colour
 * @param luminance2 The luminance of the second colour
 * @returns The contrast ratio between the two colours truncated to 3 decimal places
 */
export function calculateContrastRatio(
	luminance1: number,
	luminance2: number,
): number {
	// Determine which colour is lighter and which is darker
	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);

	// Calculate the contrast ratio
	// The spec sets the ratio as (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter colour and L2 is the darker colour
	// https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
	const ratio = (lighter + 0.05) / (darker + 0.05);

	// Return the contrast ratio truncated to 3 decimal places
	return Math.floor(ratio * 1000) / 1000;
}
