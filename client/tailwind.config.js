export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "v-diagonal": {
          "0%": { transform: "translate(-50px, -50px) rotate(0deg)" },
          "100%": { transform: "translate(500px, 300px) rotate(15deg)" },
        },
      },
      animation: {
        "v-diagonal": "v-diagonal 12s linear infinite",
      },
    },
  },
  plugins: [],
};
