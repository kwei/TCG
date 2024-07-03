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
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base-color": "var(--base-color)",
        "dark-base-color": "var(--dark-base-color)",
        "light-base-color": "var(--light-base-color)",
        frame: "var(--frame)",
        "light-frame": "var(--light-frame)",
        highlight: "var(--highlight)",
        primary: "var(--primary)",
        "light-primary": "var(--light-primary)",
      },
    },
  },
  plugins: [],
};
export default config;
