 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        colors: {
          primary: "#f6bd60",
          secodary: "#84a59d",
          background: "#f7ede2",
          darkGray: "##333333",
          accent: "#f28482 "
        }
      },
    },
    plugins: [
        require('daisyui'),
    ],
  };