
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      
     
      colors: {
        hoverColor: "#004AAD",
        brightColor: "#5271FF",
        backgroundColor: "#36ae9a",
        textStyleColor: "#339d33",
      },
    },
  },
  
  plugins: [],
};
/*
 animation: {
                marquee: 'marquee 5s linear infinite',
                marquee2: 'marquee2 5s linear infinite',
              },
              keyframes: {
                marquee: {
                  '0%': { transform: 'translateX(0%)' },
                  '100%': { transform: 'translateX(-100%)' },
                },
                marquee2: {
                  '0%': { transform: 'translateX(100%)' },
                  '100%': { transform: 'translateX(0%)' },
                },
              },
*/