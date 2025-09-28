/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maris-blue': '#0ea5e9',
        'maris-dark': '#0f172a',
        'maris-green': '#10b981',
        'maris-red': '#ef4444',
        'maris-yellow': '#f59e0b',
        'maris-purple': '#8b5cf6',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
