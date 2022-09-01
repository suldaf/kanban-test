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
        group: {
          "0-border": "#4DB5BC",
          "0-bg": "#F7FEFF",
          "0-text": "#01959F",
          "1-border": "#FEEABC",
          "1-bg": "#FFFCF5",
          "1-text": "#FA9810",
          "2-border": "#F5B1B7",
          "2-bg": "#FFFAFA",
          "2-text": "#E11428",
          "3-border": "#B8DBCA",
          "3-bg": "#F8FBF9",
          "3-text": "#43936C",
        },
      },
    },
  },

  plugins: [],
};
