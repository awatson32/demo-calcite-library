import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      typescript({ tsconfig: "./tsconfig.json" }),
      commonjs({
        exclude: [
          'node_modules/@esri/calcite-components/dist/custom-elements/index.js'
        ]
      }),
      terser(),
      postcss({ 
        modules: true,
        extensions: [".css"] }),
      copy({
        targets: [
          {
            src: "./node_modules/@esri/calcite-components/dist/calcite/assets",
            dest: "./dist",
          },
        ],
        copyOnce: true,
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  }
];
