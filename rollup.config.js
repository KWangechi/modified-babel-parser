import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import replace from "@rollup/plugin-replace";

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
    nodeResolve({ preferBuiltins: true }),
    replace({
      preventAssignment: true,
      'process.env.BABEL_8_BREAKING': JSON.stringify(false),
    }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
    terser()
  ],
};
