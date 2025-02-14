/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#087e4d",
        bg: "#222222",
        bg2: "#171717",
      },
    },
  },
  plugins: [],
};
