import { style } from "@vanilla-extract/css";
import { vars } from "~/app.css";
import { flexCenter } from "~/mixins.css";
import { theme } from "~/theme.css";

export const icons_container = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 16,
  padding: theme.space[4],
});

export const ui_container = style([
  flexCenter,
  {
    gap: 4,
    padding: theme.space[4],
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
  // ":hover": {
  //   background: vars.,
  // },
  selectors: {
    "&[aria-checked='true']": {
      background: vars.foreground,
      color: vars.background,
      borderColor: vars.foreground,
    },
  },
});
