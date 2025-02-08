/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#281259",
        main: "white",
        body: "#706b86",
        bg: "#0e0826",
      },
    },
  },
  plugins: [],
};
