/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    boxShadow: {
      container: "0 0 0.625rem #fff inset",
      button:
        "0 5px 10px rgba(255, 255, 255, 0.8) inset, 0 -5px 10px rgba(0, 0, 0, 0.8) inset",
      buttonActive:
        "0 -5px 10px rgba(0, 0, 0, 0.8) inset, 0 5px 10px rgba(255, 255, 255, 0.8) inset",
    },
  },
  plugins: [],
};
