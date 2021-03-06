module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          '0%' : { opacity: '0', transform: 'translateX(400px)'},
          '25%' : { opacity: '1', transform: 'translateX(0px)'},
          '75%' : { opacity: '1', transform: 'translateX(0px)'},
          '100%' : { opacity: '0', transform: 'translateX(400px)'},
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 4s ease-out'
      },
      colors: {
        // logo: {
        //     100: "#d1d4da",
        //     200: "#a4a9b5",
        //     300: "#767d8f",
        //     400: "#49526a",
        //     500: "#1b2745",
        //     600: "#161f37",
        //     700: "#101729",
        //     800: "#0b101c",
        //     900: "#05080e"
        // },
        logo: {
          100: "#fdd9df",
          200: "#fbb3bf",
          300: "#f88da0",
          400: "#f66780",
          500: "#f44160",
          600: "#c3344d",
          700: "#92273a",
          800: "#621a26",
          900: "#310d13"
        },
        hardpurple: {
            100: "#d3ccda",
            200: "#a799b5",
            300: "#7c6690",
            400: "#50336b",
            500: "#240046",
            600: "#1d0038",
            700: "#16002a",
            800: "#0e001c",
            900: "#07000e"
        },
        hardorange: {
            100: "#ffeccc",
            200: "#ffd899",
            300: "#ffc566",
            400: "#ffb133",
            500: "#ff9e00",
            600: "#cc7e00",
            700: "#995f00",
            800: "#663f00",
            900: "#332000"
    },
      }

    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
 
}