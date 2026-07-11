/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Legacy `gold-*` classes map to the green accent scale (no yellow/gold).
        gold: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532d',
        },
        brand: {
          blue: {
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
          },
          green: {
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            lime: '#A6FF1A',
          },
          cream: '#FDF9ED',
          black: '#020201',
          charcoal: '#2A2925',
        },
        dark: {
          100: '#2d2d2d',
          200: '#1a1a1a',
          300: '#0f0f0f',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        'heading': ['Exo 2', 'Orbitron', 'Segoe UI', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #141414 100%)',
        'gold-accent': 'linear-gradient(90deg, #2563EB, #22C55E, #2563EB)',
      },
      boxShadow: {
        'gold': '0 10px 25px rgba(37, 99, 235, 0.22)',
        'gold-lg': '0 15px 30px rgba(34, 197, 94, 0.28)',
      }
    },
  },
  plugins: [],
}
