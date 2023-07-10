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
      headerDecoration: "1rem 0 0 #000, 2rem 0 0 #000, 3rem 0 0 #000",
      button:
        "0 0.5rem 1rem rgba(255, 255, 255, 0.8) inset, 0 -0.5rem 1rem rgba(0, 0, 0, 0.8) inset",
      buttonActive:
        "0 -0.5rem 1rem rgba(0, 0, 0, 0.8) inset, 0 0.5rem 1rem rgba(255, 255, 255, 0.8) inset",
    },
    keyframes: {
      flash: {
        "0%": { opacity: 1 },
        "100%": { opacity: 0.2 },
      },
    },
    animation: {
      flash: "flash 0.5s steps(2, start) infinite",
    },
  },
  plugins: [rotateY],
};
