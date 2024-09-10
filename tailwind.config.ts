module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,html}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        header: "var(--header)",
        border: "var(--border)",
        mutedText: "var(--muted-text)",
        link: "var(--link)",
        buttonBg: "var(--button-bg)",
        buttonText: "var(--button-text)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
