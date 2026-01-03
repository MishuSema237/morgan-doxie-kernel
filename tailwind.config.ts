import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C6A55C",
        brown: "#2C1802", // Dark Chocolate
        dark: "#1a1a1a",
        cream: "#FDFBF7",
        section: "#F5F2EA", // Slightly darker cream for sections
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      maxWidth: {
        'mobile': '430px',
      },
    },
  },
  plugins: [],
};
export default config;


