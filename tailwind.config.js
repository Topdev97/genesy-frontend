/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['Roboto'],
        Pacifico: ['Pacifico'],
        Erica: ['Erica One'], 
        Luckiest: ['Luckiest Guy'], 
        Permanent: ["Permanent Marker"],    
      },
      animation: {
        shine: "shine 1s",
      },
      keyframes: {
        shine: {
          "100%": { left: "25%" },
        },
      },
      boxShadow: {
        '4xl': 'rgb(255, 255, 255, 0.5) 0px 0px 10px 10px',
      }
    },
  },
  plugins: [],
}