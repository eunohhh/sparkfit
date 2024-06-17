/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1280px'
    },
    colors: {
      default: '#efefef'
    }
  },
  plugins: []
};
