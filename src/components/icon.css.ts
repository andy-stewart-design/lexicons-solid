import { style } from "@vanilla-extract/css";
import { flexCenter } from "~/mixins.css";

export const card = style([
  flexCenter,
  {
    flexDirection: "column",
    padding: "1rem 1rem",
    minHeight: 240,
    border: "1px solid",
    borderRadius: 4,
  },
]);

export const iconContainer = style([
  flexCenter,
  {
    flexGrow: 1,
  },
]);

export const text = style({
  fontSize: 13,
  textTransform: "capitalize",
});
