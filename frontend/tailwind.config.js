// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,jsx}"],
//   mode: "jit",
//   theme: {
//     extend: {
//       animation: {
//         marquee: 'marquee 25s linear infinite',
//         marquee2: 'marquee2 25s linear infinite',
//       },
//       keyframes: {
//         marquee: {
//           '0%': { transform: 'translateX(0%)' },
//           '100%': { transform: 'translateX(-100%)' },
//         },
//         marquee2: {
//           '0%': { transform: 'translateX(100%)' },
//           '100%': { transform: 'translateX(0%)' },
//         },
//       },
//       colors: {
//         primary2: "#3b82f6",
//         bgOrange: "#339d33",
//         bgOrangeDark: "008000",
//         lightOrange: "#70aa70",
//         secondary: "#00f6ff",
//         dimWhite: "rgba(255, 255, 255, 0.7)",
//         dimBlue: "rgba(9, 151, 124, 0.1)",
//         primary: {
//           50: "#eff6ff",
//           100: "#dbeafe",
//           200: "#bfdbfe",
//           300: "#93c5fd",
//           400: "#60a5fa",
//           500: "#3b82f6",
//           600: "#2563eb",
//           700: "#1d4ed8",
//           800: "#1e40af",
//           900: "#1e3a8a",
//           950: "#172554",
//         },
//       },
//       fontFamily: {
//         poppins: ["Montserrat", "sans-serif"],
//       },
//     },
//     screens: {
//       xs: "480px",
//       ss: "620px",
//       sm: "768px",
//       md: "1060px",
//       lg: "1200px",
//       xl: "1700px",
//     },
//   },
//   variants: {},
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
