/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        desktop: '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
    
        'black-black-5': '#0b0b0f',
        gray: 'rgba(11, 11, 15, 0.2)',
        'black-black-12': '#1a1b23',
        'black-black-100': '#fff',
        'gradient-main': '#18c8ff',
        'black-black-40': '#565a76',
        'black-black-60': '#898da9',
        'gradient-light': 'rgba(255, 255, 255, 0.47)',
        'system-green': '#0dbb7c',
        'primary-purple': '#b982ff',
        'black-black-20': '#2b2c3b',
        'system-red': '#ff8282',
        ['lavender-blue']: {
          50: '#f2f3ff',
          100: '#e4e7ff',
          200: '#c9cfff',
          300: '#aeb8ff',
          400: '#93a0ff',
          500: '#7888ff',
          600: '#606dcc',
          700: '#485299',
          800: '#303666',
          900: '#181b33',
        },

        
        "gray-24": "#09080c",
        white: "#fff",
        "gray-22": "#1c1924",
        black: "#000",
        "black-color": "#1d1d21",
        "gray-3": "#ccc",
        peachpuff: "#fecba7",
        "gray-1": "#333",
        paleturquoise: "#a7f4fe",
        "secondary-color-magic-mint": "#a7feda",
        "primary-color-mauve": "#ebb3ff",
        "black-color1": "#131313",
        palegoldenrod: "#ffeeb3",
        "gray-2": "#666",
        steelblue: "#46639d",
        dimgray: "rgba(103, 103, 103, 0.3)",
        dodgerblue: "rgba(91, 144, 253, 0.11)",
        darkslateblue: "#233f78",
        gray1: {
          "100": "#848484",
          "200": "#232323",
          "300": "rgba(255, 255, 255, 0.8)",
          "400": "rgba(255, 255, 255, 0.47)",
        },
        silver: "#c4c4c4",

      },
      spacing: {},
      fontFamily: {
        'button-14': 'Inter',
      },
      borderRadius: {
        '3xs': '10px',
        '6xl': '25px',
      },
    },
    fontSize: {
      sm: '14px',
      base: '16px',
      '31xl': '50px',
      xl: '20px',
      '12xl': '30px',
      '13xl': '32px',
      '66xl': '85px',
      inherit: 'inherit',
    },
  },
  corePlugins: {
    preflight: false,
  },
};

/*
extend: {
  colors: {
    "gray-24": "#09080c",
    white: "#fff",
    "gray-22": "#1c1924",
    black: "#000",
    "black-color": "#1d1d21",
    "gray-3": "#ccc",
    peachpuff: "#fecba7",
    "gray-1": "#333",
    paleturquoise: "#a7f4fe",
    "secondary-color-magic-mint": "#a7feda",
    "primary-color-mauve": "#ebb3ff",
    "black-color1": "#131313",
    palegoldenrod: "#ffeeb3",
    "gray-2": "#666",
    steelblue: "#46639d",
    dimgray: "rgba(103, 103, 103, 0.3)",
    dodgerblue: "rgba(91, 144, 253, 0.11)",
    darkslateblue: "#233f78",
    gray: {
      "100": "#848484",
      "200": "#232323",
      "300": "rgba(255, 255, 255, 0.8)",
      "400": "rgba(255, 255, 255, 0.47)",
    },
    silver: "#c4c4c4",
  },
  spacing: {},
  fontFamily: {
    barlow: "Barlow",
    "btn-large-normal": "Poppins",
    "heading-1": "'Clash Grotesk'",
    "nexa-light": "'Nexa Light'",
    "nexa-bold": "'Nexa Bold'",
  },
  borderRadius: {
    "81xl": "100px",
    "11xl": "30px",
    "311xl": "330px",
    xl: "20px",
    "3xs": "10px",
    "5xl-5": "24.5px",
    "10xs-4": "2.4px",
    "8xs-8": "4.8px",
  },
},
fontSize: {
  base: "16px",
  "11xl": "30px",
  "29xl": "48px",
  lg: "18px",
  sm: "14px",
  "5xl": "24px",
  xs: "12px",
  "5xs-1": "7.1px",
  inherit: "inherit",
},*/