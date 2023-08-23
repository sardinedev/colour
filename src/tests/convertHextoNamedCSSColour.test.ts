import test from "ava";
import { convertHextoNamedCSSColour } from "../convertHextoNamedCSSColour.js";

test("should return the named CSS colour from a hex colour", ({ is }) => {
	const colour = "#ff0000";
	is(convertHextoNamedCSSColour(colour), "red");
});

test("should return undefined if no named CSS colour matches the given hex colour", ({
	is,
}) => {
	const colour = "#313233";
	is(convertHextoNamedCSSColour(colour), undefined);
});
