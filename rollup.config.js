import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";
import pluginBabelBitDecorator from "./types/babel-plugin-main.cjs";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "lib/index.cjs",
      format: 'cjs'
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    babel({
      babelrc: false,
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      exclude: ["node_modules/**"],
      parserOpts: { sourceType: "module" },
      presets: [
        [
          "@babel/preset-typescript",
          {
            allowDeclareFields: true,
          },
        ],
      ],
      plugins: [
        pluginBabelBitDecorator,
        [
          "@babel/plugin-proposal-decorators",
          {
            version: "2021-12",
          },
        ],
      ],
    }),
    terser(),
  ],
};
