/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // App router kullanıyorsanız
    './pages/**/*.{js,ts,jsx,tsx}', // Pages router kullanıyorsanız
    './components/**/*.{js,ts,jsx,tsx}', // Bileşenler
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

