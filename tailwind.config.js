// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        dark: {
          default: "#0a0f1c", // deep space black
          light: "#1a2233",   // softer panel background
          softer: "#2a3245",  // card/hover bg
        },
        logoBlue: "#4555e3",
        // Accents
        neon: {
          blue: "#00f0ff",   // cyber blue
          purple: "#a855f7", // glowing purple
          green: "#00ff9d",  // neon green
          pink: "#ff00aa",   // magenta-pink glow
        },

        // Text
        text: {
          base: "#e4e6eb", // light gray for body
          muted: "#9ca3af", // dimmer gray
          heading: "#ffffff", // crisp white
        },
      },

      backgroundImage: {
        "tech-gradient":
          "linear-gradient(135deg, #0a0f1c 0%, #1a2233 50%, #2a3245 100%)",
        "neon-glow":
          "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.25), transparent 70%)",
      },

      translate: {
        '101': '101%',
      },

      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-50%)' }
        }
      },

      animation: {
        marquee: 'marquee 15s linear infinite'
      },
    },
  },
  plugins: [],
};
