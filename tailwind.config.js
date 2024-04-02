// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#333333', // Define el color para el modo oscuro
        light: '#FFFFFF', // Define el color para el modo claro
      },
    },
  },
  plugins: [],
};

