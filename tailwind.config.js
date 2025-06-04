module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    'bg-primary',
    'bg-primary-light',
    'bg-primary-dark',
    'bg-secondary',
    'bg-secondary-light',
    'bg-secondary-dark',
    'bg-accent',
    'bg-danger'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          light: '#3b82f6',
          dark: '#1e40af',
        },
        secondary: {
          DEFAULT: '#f59e42',
          light: '#fbbf24',
          dark: '#b45309',
        },
        accent: '#10b981',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}