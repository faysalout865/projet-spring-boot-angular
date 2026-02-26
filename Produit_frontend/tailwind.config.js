// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        vibe: {
          'bg': '#0f111a',
          'surface': '#1a1d2d',
          'border': '#2d334a',
          'neon-blue': '#00f0ff',
          'neon-purple': '#b026ff',
          'text': '#e2e8f0',
          'muted': '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 240, 255, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
