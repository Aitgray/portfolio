// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media", // follow system/browser setting
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'xl': '0 20px 45px -15px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        // optional: customize if you add a font
      },
    },
  },
  plugins: [],
};
export default config;
