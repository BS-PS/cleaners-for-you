/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E3A8A',
          purple: '#4C1D95',
          green: '#16A34A',
          lightblue: '#EFF6FF',
        },
      },
    },
  },
  plugins: [],
};
