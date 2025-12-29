import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
const packageJson = require("./package.json");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: packageJson.main,
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    json()
  ],
  external: ["react", "react-dom"]
};
