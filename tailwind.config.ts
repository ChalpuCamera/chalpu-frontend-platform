import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        empty: "#FFFFFF",
        gray: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#868E96",
          700: "#495057",
          800: "#343A40",
          900: "#212529",
        },
        red: {
          50: "#FFEBEE",
          100: "#FFCCD1",
          200: "#F49CA0",
          300: "#FF6B6B",
          400: "#F8535A",
          500: "#FF4141",
          600: "#EF373F",
          700: "#DD2C39",
          800: "#D02532",
          900: "#C11625",
          950: "#400E0C",
        },
        orange: {
          50: "#FFF3E4",
          100: "#FFE6CC",
          200: "#FFCF99",
          300: "#FFB866",
          400: "#FE951C",
          500: "#FF8205",
          600: "#FF7300",
          700: "#FF6600",
          800: "#FF5900",
          900: "#FC4E03",
          950: "#3E160A",
        },
        yellow: {
          50: "#FFF3E4",
          100: "#FFE6CC",
          200: "#FFCF99",
          300: "#FFB866",
          400: "#FE951C",
          500: "#FF8205",
          600: "#FF7300",
          700: "#FF6600",
          800: "#FF5900",
          900: "#FC4E03",
          950: "#FC4E03",
        },
        sky: {
          50: "#F1F9FF",
          100: "#E3F1FD",
          200: "#C1E5FC",
          300: "#8BD2FD",
          400: "#4EB9FA",
          500: "#53A4EE",
          600: "#2982CB",
          700: "#2167A3",
          800: "#1F5786",
          900: "#1D496D",
          950: "#132E48",
        },
        blue: {
          50: "#ECF7FF",
          100: "#D4E6FF",
          200: "#B0D0FD",
          300: "#7DA4FE",
          400: "#5783FC",
          500: "#4677FF",
          600: "#3563E4",
          700: "#2957D6",
          800: "#1B47C2",
          900: "#1540B8",
        },
        green: {
          50: "#E5F6E7",
          100: "#C1E8C4",
          200: "#97D99E",
          300: "#69CB76",
          400: "#40C057",
          500: "#00B437",
          600: "#00A52D",
          700: "#009321",
          800: "#008214",
          900: "#006200",
          950: "#112D18",
        },
        purple: {
          50: "#F7F4FE",
          100: "#EFEBFC",
          200: "#E2DAFA",
          300: "#CDBDF5",
          400: "#B497EE",
          500: "#A67DE8",
          600: "#8C4ED9",
          700: "#7C3BC6",
          800: "#641AA9",
          900: "#562A88",
          950: "#112D18",
        },

        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Card colors
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",

        // Popover colors
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",

        // Primary colors
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",

        // Secondary colors
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",

        // Muted colors
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",

        // Accent colors
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",

        // Destructive colors
        destructive: "var(--destructive)",

        // Border and input colors
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",

        // Chart colors
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-3": "var(--chart-3)",
        "chart-4": "var(--chart-4)",
        "chart-5": "var(--chart-5)",

        // Sidebar colors
        sidebar: "var(--sidebar)",
        "sidebar-foreground": "var(--sidebar-foreground)",
        "sidebar-primary": "var(--sidebar-primary)",
        "sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
        "sidebar-accent": "var(--sidebar-accent)",
        "sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
        "sidebar-border": "var(--sidebar-border)",
        "sidebar-ring": "var(--sidebar-ring)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        DEFAULT: "var(--radius)",
      },
    },
  },
  plugins: [],
};
export default config;
