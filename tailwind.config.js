/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        'my-black':"rgba(0,0,0,0.25)",
        'my-black2':"#CCCCCD",
        'pin-red':"#E70022",
        'pin-redh':"#B70001"
        
      },

      boxShadow: {
        'my-shadow':"0 0 10px 5px rgba(0,0,0,0.4)"
        
      },
    },
  },
  plugins: [],
}

