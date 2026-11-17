/** Any valid hexadecimal colour: 3, 4, 6, or 8 hex digits after `#` */
export const hexAnyRegex =
	/^#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})$/;
function skipWhitespace(value: string, index: number, end: number): number {
	while (index < end && /^\s$/.test(value[index] as string)) {
		index++;
	}
	return index;
}

function isDigit(value: string, index: number): boolean {
	const character = value[index];
	return character !== undefined && character >= "0" && character <= "9";
}

function readChannel(
	value: string,
	start: number,
	end: number,
): { value: string; next: number } | null {
	let index = start;
	if (value[index] === "+" || value[index] === "-") {
		index++;
	}

	const integerStart = index;
	while (index < end && isDigit(value, index)) {
		index++;
	}
	const hasInteger = index > integerStart;

	if (value[index] === ".") {
		index++;
		const fractionStart = index;
		while (index < end && isDigit(value, index)) {
			index++;
		}
		if (index === fractionStart) {
			return null;
		}
	} else if (!hasInteger) {
		return null;
	}

	if (value[index] === "%") {
		index++;
	}
	return { value: value.slice(start, index), next: index };
}

export function parseCSSRGB(
	colour: string,
): [string, string, string, string?] | null {
	if (typeof colour !== "string") {
		return null;
	}

	const prefix = colour.slice(0, 5).toLowerCase() === "rgba(" ? 5 : 4;
	if (
		(prefix === 4 && colour.slice(0, 4).toLowerCase() !== "rgb(") ||
		colour.at(-1) !== ")"
	) {
		return null;
	}

	const end = colour.length - 1;
	let index = skipWhitespace(colour, prefix, end);
	const channels: string[] = [];

	for (let channel = 0; channel < 3; channel++) {
		const parsed = readChannel(colour, index, end);
		if (!parsed) {
			return null;
		}
		channels.push(parsed.value);
		index = parsed.next;

		if (channel < 2) {
			const separatorStart = index;
			index = skipWhitespace(colour, index, end);
			if (colour[index] === ",") {
				index = skipWhitespace(colour, index + 1, end);
			} else if (index === separatorStart) {
				return null;
			}
		}
	}

	index = skipWhitespace(colour, index, end);
	let alpha: string | undefined;
	if (colour[index] === "," || colour[index] === "/") {
		const parsed = readChannel(
			colour,
			skipWhitespace(colour, index + 1, end),
			end,
		);
		if (!parsed) {
			return null;
		}
		alpha = parsed.value;
		index = skipWhitespace(colour, parsed.next, end);
	}

	if (index !== end) {
		return null;
	}
	return alpha
		? [
				channels[0] as string,
				channels[1] as string,
				channels[2] as string,
				alpha,
			]
		: [channels[0] as string, channels[1] as string, channels[2] as string];
}
