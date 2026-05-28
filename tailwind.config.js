/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0B0B',
          card: '#171717',
          orange: '#F58220',
          white: '#F5F5F5',
          gray: '#9A9A9A',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'Sora', 'sans-serif'],
        body: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(245, 130, 32, 0.15)',
        'glow-orange-lg': '0 0 50px rgba(245, 130, 32, 0.3)',
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
