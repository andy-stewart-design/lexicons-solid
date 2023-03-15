import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("html, body", {
  background: "#cfcfcf",
  color: vars.colors.black,
  fontFamily: `Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
  "Helvetica Neue", sans-serif`,
  WebkitTapHighlightColor: "rgb(0 0 0)",
});
