/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        noto: ['Noto Sans Lao', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        quattrocento: ['Quattrocento Sans', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        urbanist: ['Urbanist', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

