/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				dark: '#111111',
				light: '#eeeeee',
				primary: {
					900: '#191737',
					700: '#272563'
				},
				secondary: '#FCD34D'
			},
			fontFamily: {
				inter: ['"Inter"']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}
