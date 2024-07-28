/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        textPrimary: '#e0e0e1',
        textSecondary: '#848b94',
        bgPrimary: '#202128',
        bgSecondary: '#24252d',
        borderPrimary: '#2a2b33',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
