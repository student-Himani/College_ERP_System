module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B4B8A",
          light: "#8B7BB5",
          dark: "#4A3A7A",
        },
        secondary: {
          DEFAULT: "#8B7BB5",
          light: "#A594C5",
          dark: "#6B5B9A",
        },
        accent: {
          DEFAULT: "#5B4B8A",
          glow: "#8B7BB5",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          light: "#F8FAFC",
          dark: "#0F172A",
        },
        light: {
          DEFAULT: "#E5E7EB",
          50: "#F3F0FA",
        },
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { boxShadow: "0 0 5px #5B4B8A, 0 0 10px #5B4B8A" },
          to: { boxShadow: "0 0 20px #8B7BB5, 0 0 30px #8B7BB5" },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        premium: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.05)",
        "premium-hover": "0 20px 40px -5px rgba(0, 0, 0, 0.15), 0 8px 16px -8px rgba(0, 0, 0, 0.08)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
