module.exports = {
  enabled: true,
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        light: {
          background: {
            100: '#e7e7e7',
          }
        }
      }
    },
  },
  plugins: [],
}
