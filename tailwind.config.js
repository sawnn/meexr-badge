/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html',
'./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
				'dark': '#1A1C1F',
				'grey': '#F6F6F6',
				'green': '#68A17E',
				'scoreGreen': '#68A17E',
				'scoreGreenDark': '#68A17E',
				'scoreOrange': '#F6A673',
				'scoreOrangeDark': '#F6A673',
				'scoreBlue': '#A19FE2',
				'scoreBlueDark': '#A19FE2',
				'scoreRed': '#E5726B',
				'scoreRedDark': '#E5726B',

			},
    },
  },
  plugins: [],
}

