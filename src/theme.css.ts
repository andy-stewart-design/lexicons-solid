import { createGlobalTheme } from "@vanilla-extract/css";

export const theme = createGlobalTheme(":root", {
  colors: {
    black: "#18181b",
    neutral: {
      100: "#f4f7f4",
    },
    brand: "blue",
  },
  space: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
  },
});
