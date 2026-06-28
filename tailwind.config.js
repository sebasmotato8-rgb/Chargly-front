/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        terra: {
          DEFAULT: '#D4825A',
          light: '#E09A78',
          dark: '#B86C45',
        },
        cream: {
          50: '#FAFAF8',
          100: '#F7F0EE',
          200: '#F5F2EE',
          300: '#EEEBE6',
          400: '#E8E4DF',
          500: '#E0DCD6',
          600: '#D8D4CE',
        },
        dark: {
          DEFAULT: '#0D0D0D',
          light: '#141414',
          text: '#888888',
        },
        accent: {
          50: '#FFF4E6',
          100: '#FFE4BF',
          200: '#FFC97A',
          300: '#FFAD35',
          400: '#E09A78',
          500: '#D4825A',
          600: '#B86C45',
          700: '#9C5A38',
          800: '#804A2E',
          900: '#663B24',
        },
      },
    },
  },
  plugins: [],
}
