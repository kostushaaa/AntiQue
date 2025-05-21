import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFF8E1",
            foreground: "#0A3A45",
            focus: "#E67E22",
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#0A3A45"
            },
            content2: {
              DEFAULT: "#F5F5F5", 
              foreground: "#0A3A45"
            },
            primary: {
              50: "#FFF5E6",
              100: "#FFEACC",
              200: "#FFD699",
              300: "#FFC266",
              400: "#FFAD33",
              500: "#E67E22", // Primary orange
              600: "#CC6A1B",
              700: "#B35900",
              800: "#994D00",
              900: "#804000",
              DEFAULT: "#E67E22",
              foreground: "#FFFFFF"
            },
            secondary: {
              50: "#E6F0F2",
              100: "#CCE0E5",
              200: "#99C2CB",
              300: "#66A3B2",
              400: "#338598",
              500: "#0A3A45", // Secondary dark teal
              600: "#09333D",
              700: "#072C34",
              800: "#06242C",
              900: "#051D24",
              DEFAULT: "#0A3A45",
              foreground: "#FFFFFF"
            }
          }
        }
      }
    })
  ]
};
