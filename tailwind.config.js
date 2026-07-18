module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        university: {
          50: '#f3f8ff',
          100: '#e6f0ff',
          500: '#1f6fb6',
          700: '#145a9a'
        }
      }
    }
  },
  plugins: [],
}
