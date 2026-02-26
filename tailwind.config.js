/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg0: "var(--bg-0)",
        bg1: "var(--bg-1)",
        panel: "var(--panel)",
        panel2: "var(--panel-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        primary: "var(--primary)",
        primary2: "var(--primary-2)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};