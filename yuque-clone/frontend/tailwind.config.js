/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yuque: {
          blue: '#006CFF',
          gray: '#F7F8FA',
          text: '#1F2329',
          textSecondary: '#646A73',
          border: '#DEE0E3',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'yuque': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'yuque-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
