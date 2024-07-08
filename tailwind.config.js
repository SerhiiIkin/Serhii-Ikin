/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(min(var(--gridMinWidth), 100%), 1fr))',
      },
      colors: {
        primaryGreen: 'rgb(74, 222, 128)',
        primaryDarkBlue: 'rgb(30, 58, 138)',
        primaryLigthBlue: '#60a5fa',
        primaryLigthYellow: 'rgb(250, 204, 21)',
        primaryOrange: 'rgb(249, 115, 22)',
        primaryLigth: 'rgb(253, 253, 253,0.9) ',
        primaryDark: 'rgb(5,5,5,0.9) ',
        secondaryGrey: 'rgb(209 213 219)',
        secondaryRed: 'rgb(250,0,0,0.9)',
      },
      animation: {
        'lds-spinner': 'lds-spinner 1.2s linear infinite',
      },
      keyframes: {
        'lds-spinner': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
