import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import { readFileSync, copyFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

// Plugin to copy CSS file after build
const copyCssPlugin = () => ({
  name: 'copy-css',
  buildEnd() {
    const src = 'src/lib/cron-builder.css';
    const dest = 'build/cron-builder.css';
    try {
      mkdirSync(dirname(dest), { recursive: true });
      copyFileSync(src, dest);
      console.log(`✓ Copied ${src} to ${dest}`);
    } catch (err) {
      console.error(`Failed to copy CSS: ${err.message}`);
    }
  }
});

export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: packageJson.main,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
    postcss(),
    json(),
    copyCssPlugin()
  ],
  external: ["react", "react-dom"]
};
