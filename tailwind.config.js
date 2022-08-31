/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#01959F",
        done: "#43936C",
        failed: "#E11428",
        dot: "#757575",
        bg_card: "#FAFAFA",
        bg_card_border: "#E0E0E0",
      },
    },
  },

  plugins: [],
};
