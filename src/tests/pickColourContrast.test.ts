import test from "ava";
import { pickHexColourContrast } from "../pickHexColourContrast.js";

test("should return #FFFFFF as the best colour for a #333333 background", ({
  is,
}) => {
  const colours = {
    backgroundColour: "#333333",
    optionOneColour: "#FFFFFF",
    optionTwoColour: "#000000",
  };
  is(pickHexColourContrast(colours, "WCAG2.1"), "#FFFFFF");
});

test("should return #000000 as the best colour for a #BED background", ({
  is,
}) => {
  const colours = {
    backgroundColour: "#BED",
    optionOneColour: "#FFFFFF",
    optionTwoColour: "#000000",
  };
  is(pickHexColourContrast(colours, "WCAG2.1"), "#000000");
});

test("should return #000000 as the best colour for a #DD337F background", ({
  is,
}) => {
  const colours = {
    backgroundColour: "#DD337F",
    optionOneColour: "#FFFFFF",
    optionTwoColour: "#000000",
  };
  is(pickHexColourContrast(colours, "WCAG2.1"), "#000000");
});
