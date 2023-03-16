import { createVar, globalStyle } from "@vanilla-extract/css";
import { theme } from "./theme.css";

const background = createVar();
const foreground = createVar();

export const vars = {
  background,
  foreground,
};

globalStyle(":root", {
  vars: {
    [background]: theme.colors.neutral[100],
    [foreground]: theme.colors.black,
  },
  "@media": {
    "(prefers-color-scheme: dark)": {
      vars: {
        [background]: theme.colors.black,
        [foreground]: theme.colors.neutral[100],
      },
    },
  },
});

globalStyle("html, body", {
  background: background,
  color: foreground,
  fontFamily: `Inter, system-ui, Roboto, "Open Sans",
  "Helvetica Neue", sans-serif`,
  WebkitTapHighlightColor: "rgb(0 0 0)",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
});
