import { style } from "@vanilla-extract/css";
import { flexCenter } from "~/mixins.css";
import { vars } from "~/theme.css";

export const icons_container = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 16,
  padding: vars.space[4],
});

export const ui_container = style([
  flexCenter,
  {
    gap: 4,
    padding: vars.space[4],
    paddingBottom: 0,
  },
]);

export const radio_group = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 4,
});

export const radio_item = style({
  border: "1px solid",
  borderRadius: 4,
  padding: "6px 12px",
  userSelect: "none",
  fontVariantNumeric: "tabular-nums",
  ":hover": {
    background: "rgba(0 0 255 / 0.1)",
  },
  selectors: {
    "&[aria-checked='true']": {
      background: vars.colors.black,
      color: "white",
      borderColor: vars.colors.black,
    },
  },
});
