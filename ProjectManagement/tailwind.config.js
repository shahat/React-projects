/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Priority colors
        priority: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#ef4444',
          urgent: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
