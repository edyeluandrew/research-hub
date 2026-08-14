/** @type {import('tailwindcss').Config} */

/*
 * Tailwind is only used by the admin dashboard and the legal pages; the public
 * site runs on the CSS design system in src/styles. The scale names below are
 * historical — `gold` and `brand.green` now carry neutral greys so the older
 * markup inherits the monochrome palette without a mass rename.
 *
 * Status colours are deliberately absent here: the admin badges use Tailwind's
 * built-in green/orange/red utilities so state stays readable at a glance.
 */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Neutral scale, legible on near-black from 300 up.
        gold: {
          50: '#F6F6F6',
          100: '#EFEFEF',
          200: '#DFDFDF',
          300: '#D6D6D6',
          400: '#C9C9C9',
          500: '#B8B8B8',
          600: '#AFAFAF',
          700: '#797979',
          800: '#525252',
          900: '#313131',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          bright: '#FFFFFF',
          deep: '#C9C9C9',
          line: '#4A4A4A',
        },
        brand: {
          blue: {
            400: '#D6D6D6',
            500: '#C9C9C9',
            600: '#B8B8B8',
            700: '#797979',
          },
          green: {
            400: '#D6D6D6',
            500: '#C9C9C9',
            600: '#AFAFAF',
            lime: '#C9C9C9',
          },
          cream: '#EFEFEF',
          black: '#060606',
          charcoal: '#272727',
        },
        // Surfaces, matching the neutral scale in src/index.css
        dark: {
          100: '#171717',
          200: '#0B0B0B',
          300: '#060606',
        },
        kd: {
          cream: '#EFEFEF',
          beige: '#DFDFDF',
          sand: '#D6D6D6',
          gold: '#C9C9C9',
          'dark-gold': '#797979',
          black: '#060606',
          charcoal: '#272727',
          grey: '#777777',
          border: '#525252',
          white: '#FDFDFD',
        },
      },
      fontFamily: {
        'sans': ['Space Grotesk', 'Inter', 'Segoe UI', 'sans-serif'],
        'heading': ['Unbounded', 'Space Grotesk', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #060606 0%, #272727 100%)',
        'gold-accent': 'linear-gradient(90deg, #4A4A4A, #FFFFFF, #4A4A4A)',
      },
      boxShadow: {
        'gold': '0 10px 25px rgba(255, 255, 255, 0.12)',
        'gold-lg': '0 15px 30px rgba(255, 255, 255, 0.16)',
      }
    },
  },
  plugins: [],
}
