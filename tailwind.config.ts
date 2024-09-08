import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        header: "var(--header)",
        border: "var(--border)",
        "muted-text": "var(--muted-text)",
        link: "var(--link)",
        "button-bg": "var(--button-bg)",
        "button-text": "var(--button-text)",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
