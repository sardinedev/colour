const codeHighlighter = require("@sardine/eleventy-plugin-code-highlighter");
const tinyCSS = require("@sardine/eleventy-plugin-tinycss");
const tinyHTML = require("@sardine/eleventy-plugin-tinyhtml");
const safeLinks = require("@sardine/eleventy-plugin-external-links");
const imageOptimiser = require("@sardine/eleventy-plugin-image-optimiser");

const postCSS = require("./lib/postcss.11ty.cjs");

const purgeFromTailwind = (content) =>
  content.match(/[A-Za-z0-9-_:\/]+/g) || [];

module.exports = function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("css", postCSS);

  eleventyConfig.addPlugin(codeHighlighter);

  eleventyConfig.addPassthroughCopy("docs/assets");

  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addPlugin(safeLinks);
    eleventyConfig.addPlugin(imageOptimiser);
    eleventyConfig.addPlugin(tinyCSS, {
      purgeCSS: {
        keyframes: true,
        extractors: [
          {
            extractor: purgeFromTailwind,
            extensions: ["html"],
          },
        ],
      },
    });
    eleventyConfig.addPlugin(tinyHTML);
  }
  // Return your Object options:
  return {
    dir: {
      input: "docs",
      output: "_build",
    },
  };
};
