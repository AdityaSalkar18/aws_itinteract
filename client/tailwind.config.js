/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',            // Scan the root index.html
    './src/**/*.{js,ts,jsx,tsx}', // Scan all JavaScript/TypeScript files in src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
