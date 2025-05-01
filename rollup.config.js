import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import babel from "@rollup/plugin-babel";

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
      presets: [
        [
          "@babel/preset-env",
          {
            targets: "maintained node versions",
          },
        ],
        [
          "@babel/preset-typescript",
          {
            allowDeclareFields: true,
          },
        ],
      ],
      plugins: [
        [
          "@babel/plugin-proposal-decorators",
          {
            version: "2023-05",
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
