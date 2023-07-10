/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
// Rotate Y utilities
const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      container: "0 0 1rem #fff inset",
      button:
        "0 0.5rem 1rem rgba(255, 255, 255, 0.8) inset, 0 -0.5rem 1rem rgba(0, 0, 0, 0.8) inset",
      buttonActive:
        "0 -0.5rem 1rem rgba(0, 0, 0, 0.8) inset, 0 0.5rem 1rem rgba(255, 255, 255, 0.8) inset",
    },
  },
  plugins: [rotateY],
};
