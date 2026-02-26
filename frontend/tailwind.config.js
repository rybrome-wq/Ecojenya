/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Cormorant Garamond', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      colors: {
        background: '#FDFCF8',
        foreground: '#1A1C19',
        primary: {
          DEFAULT: '#3A4D39',
          light: '#4A5D49',
          foreground: '#FDFCF8'
        },
        accent: {
          DEFAULT: '#D4A373',
          foreground: '#1A1C19'
        },
        card: {
          DEFAULT: '#F4F1EA',
          foreground: '#1A1C19'
        },
        muted: {
          DEFAULT: '#4A4F4A',
          foreground: '#4A4F4A'
        },
        border: '#E5E0D6',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
