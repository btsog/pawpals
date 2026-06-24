/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pawpals brand colors — change these to restyle the whole site.
        brand: {
          DEFAULT: "#f97316", // warm orange
          dark: "#ea580c",
          light: "#fed7aa",
        },
      },
    },
  },
  plugins: [],
};
