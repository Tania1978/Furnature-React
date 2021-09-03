const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  //prefix: 'tw-',
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    // textColor: {
    //   primary: "#3490dc",
    //   secondary: "#04585b",
    //   danger: "#f0155e",
    // },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
      indigo: colors.indigo,
      red: colors.rose,
      pink: colors.pink,
      yellow: colors.amber,
      gray: colors.gray,
   
    },

    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
