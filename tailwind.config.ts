import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      colors: {
        "text": "#fafafa",
        "dark-base-color": "#27272a",
        "base-color": "#52525b",
        "light-base-color": "#71717a",
        frame: "#d4d4d8",
        "light-frame": "#e4e4e7",
        primary: "#fbbf24",
        highlight: "#fcd34d",
        "light-primary": "#fde68a",
      },
    },
  },
  plugins: [],
};
export default config;
