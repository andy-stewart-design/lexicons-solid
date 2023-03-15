import solid from "solid-start/vite";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    solid(),
    vanillaExtractPlugin({
      emitCssInSsr: true,
    }),
  ],
});
