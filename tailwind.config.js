const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extends: {
      colors: {
        primary: {
          lighter: colors.gray['600'],
          DEFAULT: colors.gray['700']
        }
      }
    }
  },
  plugins: [
    plugin(({ theme, addUtilities }) => {
      addUtilities({
        '.bg-primary': {
          'background-color': colors.gray[700]
        }
      });
    })
  ],
  variants: {
    scrollbar: ['rounded']
  }
};
