/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.handlebars"],
  theme: {
    extend: {
      screens:{
        "sm" : "480px"
      }
    },
      fontFamily:{
        mont:['Montserrat Alternates', 'sans-serif']
      }
  },
  plugins: [],
}
