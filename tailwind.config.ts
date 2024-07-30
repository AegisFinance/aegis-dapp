/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        "black-black-5": "#0b0b0f",
        gray: "rgba(11, 11, 15, 0.2)",
        "black-black-12": "#1a1b23",
        "black-black-100": "#fff",
        "gradient-main": "#18c8ff",
        "black-black-40": "#565a76",
        "black-black-60": "#898da9",
        "gradient-light": "rgba(255, 255, 255, 0.47)",
        "system-green": "#0dbb7c",
        "primary-purple": "#b982ff",
        "black-black-20": "#2b2c3b",
        "system-red": "#ff8282",
      },
      spacing: {},
      fontFamily: {
        "button-14": "Inter",
      },
      borderRadius: {
        "3xs": "10px",
        "6xl": "25px",
      },
    },
    fontSize: {
      sm: "14px",
      base: "16px",
      "31xl": "50px",
      xl: "20px",
      "12xl":"30px",
      "13xl": "32px",
      "66xl": "85px",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
