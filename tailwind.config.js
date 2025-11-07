/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#020617'
        }
      },
      backgroundImage: {
        'circuit-grid': "radial-gradient(circle at center, rgba(59,130,246,0.12) 0, rgba(59,130,246,0) 70%), linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)"
      },
      animation: {
        'pulse-slow': 'pulse 4s linear infinite',
        'spin-slow': 'spin 6s linear infinite'
      }
    }
  },
  plugins: []
};
