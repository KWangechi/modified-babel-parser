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
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [
    // Process TypeScript files
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
        [
          "@babel/preset-env",
          {
            targets: "maintained node versions",
          },
        ],
      ],
      plugins: [
        pluginBabelBitDecorator,
        [
          "@babel/plugin-proposal-decorators",
          {
            version: "2021-12",
            // decoratorsBeforeExport: true
          },
        ],
      ],
    }),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    terser(),
  ],
};
