/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily:{
        Anton: ['Anton', 'sans-serif'],
        Rubik: ['Rubik', 'sans-serif']
      },
      height:{
        customh1: "calc(100vh - 360px)",
      }
    },
  },
  plugins: [],
}

