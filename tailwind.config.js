/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: { //The theme section defines custom screen sizes and a default container padding.
    screens: {
      'xs': '280px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    container: {
      marginTop: '50px',
      padding: '2rem',
    },
    extend: { //Additional styles added or overridden beyond Tailwind's default styles.
      spacing: {
        '8': '1.7rem', // Change the md\:space-x-8 margin-left 
      }
    },
  },
  plugins: [],
}