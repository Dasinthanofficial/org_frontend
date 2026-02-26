/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // These reference the CSS variables in index.css
        bg0: "var(--bg-0)",
        bg1: "var(--bg-1)",
        panel: "var(--panel)",
        text: "var(--text)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        border: "var(--border)", 
        primary: "var(--primary)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};