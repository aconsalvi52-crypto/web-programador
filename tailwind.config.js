/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyberDark: "#08080c",
        cyberSurface: "#0f1016",
        neonCyan: "#00f2fe",
        neonPurple: "#7c3aed",
        terminalGreen: "#10b981"
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    }
  },
  plugins: []
};
