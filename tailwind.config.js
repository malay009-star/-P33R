/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        "3xl": "4px 10px 20px rgba(33, 38, 116, 0.25)",
        "1hwc": "4px 10px 20px rgba(33, 38, 116, 0.25)",
        custom: "4px 10px 20px rgba(75, 156, 211, 0.25))",
        "3hwc": "4px 10px 20px rgba(199, 93, 156, 0.25))",
      },
      colors: {
        transparent: "transparent",
        black: "#000",
        gradientPink: "#D750A0",
        gradientBlue: "#212674",
        gradientLightBlue: "#2760AA",
        white: "#fff",
      },
    },
  },
  plugins: [],
};
