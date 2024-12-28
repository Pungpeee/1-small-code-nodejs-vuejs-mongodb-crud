module.exports = {
  theme: {
    extend: {
      colors: {
        offWhite: "#E5E5E5",
        coin: "#c8cfd8",
        cloud: "#C4C4C4",
        indigo: "#4d506c",
        lemon: "#feffc1",
        sand: "#EDE2BA",
        silver: "#748ca3",
        ash: "#636363",
        fern: "#90B493",
        rose: "#DA9999",
      },
      keyframes: {
        floating: {
          "0%, 100%": {
            transform: "translateY(-50px)",
          },
          "50%": {
            transform: "translateY(0px)",
          },
        },
        "floating-sm": {
          "0%, 100%": {
            transform: "translateY(-20px)",
          },
          "50%": {
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        floating: "floating 3s ease-in-out infinite",
        "floating-sm": "floating-sm 3s ease-in-out infinite",
      },
    },
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1280px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
};
