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
        navy: {
          DEFAULT: '#1B3A6B',
          dark: '#142d54',
          light: '#EBF0FB',
        },
        cgreen: {
          DEFAULT: '#2E7D32',
          dark: '#1b5e20',
          light: '#E8F5E9',
        },
        camber: '#F59E0B',
        cred: '#D32F2F',
        cblue: '#2D5BE3',
        csurface: '#FFFFFF',
        cbg: '#F4F6F9',
        ctext: '#1A1A2E',
        cmuted: '#6B7280',
        cborder: '#E5E7EB',
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        shell: '40px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.08)',
        shell: '0 20px 60px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
};
