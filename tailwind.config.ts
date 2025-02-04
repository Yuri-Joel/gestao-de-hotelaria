import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",

        black: {
          DEFAULT: "#000000",
          100: "#06000B",
          transparent: "#0000005b",
        },

        primary: {
          800: "#0C05E5",
          700: "#2A24FA",
          DEFAULT: "#5954FB",
          500: "#8B87FC",
          400: "#BBB9FD",
          300: "#ECEBFE",
        },
        purple: {
          DEFAULT: "#47008F",
          700: "#6100C2",
          600: "#9327FF",
          500: "#C78FFF",
          400: "#EDDBFF",
        },
        blue: {
          DEFAULT: "#233876",
          800: "#0B414C",
          700: "#178DA5",
          600: "#3FC8E4",
          500: "#6BD5EA",
          400: "#C5EEF7",
        },
        gray: {
          DEFAULT: "#1F003D",
          850: "#1F2A37",
          800: "#37006E",
          700: "#161616",
          600: "#303030",
          500: "#636363",
          450: "#7D7D7D",
          400: "#969696",
          350: "#D1D5DB",
          300: "#B0B0B0",
          200: "#C9C9C9",
          100: "#E3E3E3",
          90: "#E5E7EB",
          50: "#F9FAFB",
          40: "#F3F3F3",
        },
        red: {
          DEFAULT: "#9B1C1C",
          700: "#C81E1E",
          200: "#FBD5D5",
          100: "#FDE8E8",
        },
        yellow: {
          DEFAULT: "#C29600",
          900: "#8E4B10",
          700: "#F5BD00",
          600: "#FFDA5C",
          500: "#FFE68F",
          300: "#FFF1C2",
        },
        green: {
          DEFAULT: "#0B414C",
          800: "#03543F",
          700: "#046C4E",
          500: "#069D72",
          400: "#31C48D",
          300: "#BCF0DA",
          100: "#DEF7EC",
          50: "#EFFBF6",
        },
        teal: {
          DEFAULT: "#97AB16",
          700: "#CFE642",
          600: "#E6F29C",
          500: "#F1F8C9",
          400: "#FDFEF6",
        },
      },

      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
