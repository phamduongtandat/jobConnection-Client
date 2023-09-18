const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1dbf73',
        'primary-focus': '#19a463',
        'primary-content': '#fff',
        accent: '#fbbf24',
        error: '#f87171',
        success: '#22c55e',
        base: '#f7f7f7',
        dark: '#111',
        'dark-content': '#fff',
        // border color
        border: '#c5c6c9',
        'border-focus': '#95979d',
        //
        'text-light': '#6b7280',
        text: '#333',
      },
    },
    fontFamily: {
      sans: ['Roboto', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
