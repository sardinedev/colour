const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    umd: __dirname + "/src/index.ts",
  },
  output: {
    path: __dirname + "/dist/umd",
    name: "index.js",
  },
  module: {
    target: "commonjs",
  },
  options: {
    minify: true,
    jsc: {
      parser: {
        syntax: "typescript",
      },
      target: "es2017",
      minify: {
        compress: true,
        mangle: true,
      },
    },
  },
});
