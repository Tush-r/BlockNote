import * as path from "path";
import { webpackStats } from "rollup-plugin-webpack-stats";
import { defineConfig } from "vite";
import pkg from "./package.json";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// import eslintPlugin from "vite-plugin-eslint";

const deps = Object.keys(pkg.dependencies);

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitestSetup.ts"],
  },
  plugins: [webpackStats(), cssInjectedByJsPlugin({})],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "blocknote",
      fileName: "blocknote",
    },
    rollupOptions: {
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        inlineDynamicImports: true,
        interop: "compat", // https://rollupjs.org/migration/#changed-defaults
      },
    },
  },
});
