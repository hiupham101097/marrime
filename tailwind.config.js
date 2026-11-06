/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Dancing Script"', 'cursive', 'sans-serif'],
      },
      colors: {
        wedding: {
          cream: '#FAF8F5',
          ivory: '#FFFDF9',
          gold: {
            DEFAULT: '#C5A059',
            light: '#E6CF9B',
            dark: '#99732B',
          },
          rose: {
            50: '#FDF7F8',
            100: '#FCEEF0',
            200: '#FAD9DF',
            300: '#F5B8C4',
            400: '#EC8CA0',
            500: '#DE5B78',
            600: '#C73859',
            700: '#A42743',
            800: '#8A223B',
            900: '#752037',
          },
          burgundy: '#5B1E31',
          champagne: '#F4ECE1',
        }
      },
      boxShadow: {
        'envelope': '0 20px 40px -15px rgba(91, 30, 49, 0.15), 0 0 0 1px rgba(197, 160, 89, 0.15)',
        'luxury': '0 25px 50px -12px rgba(138, 34, 59, 0.12), 0 0 20px rgba(197, 160, 89, 0.1)',
        'glow': '0 0 25px rgba(222, 91, 120, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.03)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

