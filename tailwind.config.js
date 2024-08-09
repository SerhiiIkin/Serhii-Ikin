/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit':
          'repeat(auto-fit, minmax(min(var(--gridMinWidth), 100%), 1fr))',
      },
      fontFamily: {
        DancingScript: ['Dancing Script'],
      },
      colors: {
        primaryGreen: 'rgb(18, 105, 37)',
        primaryDarkBlue: '#0056b3',
        primaryLigthYellow: 'rgb(250, 204, 21)',
        primaryOrange: 'rgb(249, 115, 22)',
        primaryLigth: 'rgb(253, 253, 253,0.9) ',
        primaryDark: 'rgb(5,5,5,0.9) ',
        secondaryGrey: 'rgb(209 213 219)',
        secondaryDarkGrey: 'rgb(75 85 99)',
        secondaryRed: 'rgb(250,0,0,0.9)',
        secondaryDarkYellow: 'rgb(250, 204, 21)',
      },
      animation: {
        'lds-spinner': 'lds-spinner 1.2s linear infinite',
        typing: 'typing 2s ease-in-out infinite',
      },
      keyframes: {
        typing: {
          '50%': { opacity: 0 },
        },
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
