/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './index.tsx',
    './App.tsx',
    './components/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        xiaobei: {
          light: '#F4E0C6',
          dark: '#4A3B32',
          accent: '#E0C6A4',
          text: '#2C221C',
          darkbg: '#1a1512',
          darktext: '#F4E0C6',
          darkaccent: '#8B7355',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
