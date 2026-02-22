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
        'display': ['Playfair Display', 'serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
      colors: {
        background: '#FEFAE0',
        foreground: '#283618',
        card: {
          DEFAULT: '#FAEDCD',
          foreground: '#283618'
        },
        popover: {
          DEFAULT: '#FEFAE0',
          foreground: '#283618'
        },
        primary: {
          DEFAULT: '#283618',
          foreground: '#FEFAE0'
        },
        secondary: {
          DEFAULT: '#606C38',
          foreground: '#FFFFFF'
        },
        muted: {
          DEFAULT: '#FAEDCD',
          foreground: '#606C38'
        },
        accent: {
          DEFAULT: '#BC6C25',
          foreground: '#FFFFFF'
        },
        destructive: {
          DEFAULT: '#9B2226',
          foreground: '#FFFFFF'
        },
        border: '#E9EDC9',
        input: '#E9EDC9',
        ring: '#606C38',
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
