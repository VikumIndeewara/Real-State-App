/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["PT Sans", "sans-serif"],
      },
      keyframes: {
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0)",
          },
          to: {
            opacity: "0",
            transform: "translateY(40%)",
          },
        },
        "make-it-bigger": {
          "0%": {
            transform: "translateY(50%) scale(0.5)",
          },
          "100%": {
            transform: "translateY(0%) scale(1)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(50%)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-right": {
          from: {
            opacity: "0",
            transform: "translateX(-20%)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-left": {
          from: {
            opacity: "0",
            transform: "translateX(20%)",
          },
          to: {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-out-down": "fade-out-down linear forwards",
        "make-it-bigger": "make-it-bigger linear forwards",
        "fade-in-up": "fade-in-up linear forwards",
        "fade-in-left": "fade-in-left linear forwards",
        "fade-in-right": "fade-in-right linear forwards",
      },
      supports: {
        "no-scroll-driven-animations": "not(animation-timeline: scroll())",
        "no-view-driven-animations": "not(animation-timeline: view())",
      },
    },
  },
  plugins: [],
};
