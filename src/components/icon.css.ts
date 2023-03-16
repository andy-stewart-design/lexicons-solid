import { style } from "@vanilla-extract/css";
import { flexCenter } from "~/mixins.css";

export const card = style([
  flexCenter,
  {
    position: "relative",
    flexDirection: "column",
    padding: "1rem 1rem",
    minHeight: 240,
    border: "1px solid",
    borderRadius: 4,
  },
]);

export const icon_container = style([
  flexCenter,
  {
    flexGrow: 1,
  },
]);

export const text = style({
  fontSize: 13,
  textTransform: "capitalize",
  opacity: 0.5,
});

export const overlay = style({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  gap: 6,
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  padding: 8,
  backdropFilter: "blur(2px)",
  opacity: 0,
  // transition: "opacity 0.2s ease, margin 1s ease",
  ":hover": {
    opacity: 1,
  },
});

export const overlay_btn = style({
  flexGrow: 1,
  background: "rgb(120 120 120 / 0.5)",
  fontSize: 13,
  visibility: "hidden",
  ":hover": {
    background: "rgb(120 120 120 / 0.8)",
  },
  selectors: {
    [`${overlay}:hover &`]: {
      visibility: "visible",
    },
  },
});
