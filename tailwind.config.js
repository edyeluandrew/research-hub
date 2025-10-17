/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Royal Gold Palette
        gold: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#f7ef8a',
          400: '#facc15',
          500: '#d4af37',  // Primary Gold
          600: '#ca8a04',
          700: '#aa8c2c',  // Dark Gold
          800: '#854d0e',
          900: '#713f12',
        },
        // Dark theme colors
        dark: {
          100: '#2d2d2d',
          200: '#1a1a1a',
          300: '#0f0f0f',
        }
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        'gold-accent': 'linear-gradient(90deg, #d4af37, #f7ef8a, #d4af37)',
      },
      boxShadow: {
        'gold': '0 10px 25px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 15px 30px rgba(212, 175, 55, 0.4)',
      }
    },
  },
  plugins: [],
}