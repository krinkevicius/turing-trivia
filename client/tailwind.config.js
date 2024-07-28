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
        bgTetrary: '#2d2f41',
        borderPrimary: '#2a2b33',
        primaryBtnColor: '#5b34dc',
        primaryBtnHover: '#6224ff',
        secondaryBtnColor: '#373842',
        secondaryBtnHover: '#3b3d45',
        copyBtn: '#24dc62',
        copyBtnHover: '#24ff62',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
