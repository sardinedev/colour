const { resolve } = require("path");
const { readFile } = require("fs/promises");
const postcss = require("postcss");
const configPath = resolve(process.cwd(), "./postcss.config.cjs");
const postcssConfig = require(configPath);

module.exports = async function postcssTransformer(file) {
  try {
    const cssPath = resolve(process.cwd(), file);
    const cssInput = await readFile(cssPath, { encoding: "utf-8" });

    const { plugins } = postcssConfig;

    const { css } = await postcss(plugins).process(cssInput, { from: cssPath });
    return css;
  } catch (error) {
    console.log(`"@sardine/eleventy-shortcode-postcss" - error : ${error}`);
  }
};
