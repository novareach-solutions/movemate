import type { Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8123AD',
        error: '#FF0000',
        success: '#5CB85C',
        warning: '#5F2C93',
        border: {
          primary: '#E4E4E7',
          secondary: 'rgba(69, 99, 214, 0.4)',
        },
      },
      
      fontFamily: {
        sans: ['var(--font-open-sans)', ...fontFamily.sans],
        gilroy: ['var(--font-gilroy)', 'sans-serif'],
      },
      screens: {
        sm: "395px",
      },
    },
  },
  plugins: [],
} satisfies Config;
