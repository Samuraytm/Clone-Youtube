/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Это позволяет переключать тему вручную через JS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Это указывает Tailwind, где искать классы
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}