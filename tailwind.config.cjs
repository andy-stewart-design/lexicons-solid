/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "rgb(var(--black) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        gray: {
          100: "rgb(var(--gray-100) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
        },
      },
      gridTemplateColumns: {
        icons: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("aria-checked", '&[aria-checked="true"]');
    }),
    ({ addUtilities }) => {
      addUtilities({
        ".flex-center": {
          "@apply flex justify-center items-center": {},
        },
      });
    },
  ],
};
