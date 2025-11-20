/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bento: {
          bg: '#0f0f13', // Very dark, almost black purple/gray
          card: '#18181b', // Slightly lighter for cards
          inner: '#202025', // Inner card elements
          accent: '#8b5cf6', // Violet accent
          text: '#e4e4e7', // Light gray text
          muted: '#a1a1aa', // Muted text
          border: '#27272a', // Subtle borders
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
