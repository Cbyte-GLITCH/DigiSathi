/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sathi: {
          dark: '#005B46',       // Primary dark green
          green: '#16845B',      // Secondary green
          lightGreen: '#E1F3E3', // Light green
          paleMint: '#E8F6F0',   // Pale mint
          lightBlue: '#DFF2FC',  // Light blue
          lightPurple: '#EDE5FC',// Light purple
          lightOrange: '#FFE8D1',// Light orange
          bg: '#FAF9F3',         // Background
          text: '#153B35',       // Main text
          textMuted: '#526B65',  // Secondary text
          border: '#D7E4DD',     // Border
          warning: '#C83D35',    // Warning
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 91, 70, 0.08), 0 2px 6px -1px rgba(0, 91, 70, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(0, 91, 70, 0.12), 0 4px 12px -2px rgba(0, 91, 70, 0.06)',
        'card-hover': '0 12px 28px -5px rgba(22, 132, 91, 0.18)',
      }
    },
  },
  plugins: [],
}
