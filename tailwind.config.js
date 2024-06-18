/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'btn-blue': '#82C0F9',
        default: '#efefef'
      },
      boxShadow: {
        sidebarshaow: '10px 4px 15px rgba(0, 0, 0, 0.05)'
      },
      width: {
        logowidth: '31px',
        iconwidth: '24px'
      },
      height: {
        iconheight: '24px'
      }
    }
  },
  plugins: []
};
