/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        customBackground: '#EAF6FE',
        customLoginButton: '#82C0F9',
        customSignupButton: '#E4E4E4',
        customSocialButton: '#FFD056'
      }
    }
  },
  plugins: []
};
