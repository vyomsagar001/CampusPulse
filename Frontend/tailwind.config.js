/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          50: '#f0f4fb',
          100: '#dbe5f3',
          200: '#b9cbe9',
          300: '#8aa9d9',
          400: '#5a80c4',
          500: '#3a61ad',
          600: '#2b4c8e',
          700: '#223b6f',
          800: '#1b2d56',
          900: '#0f1b3d',
          950: '#0a1230',
        },
        electric: {
          50: '#eff9ff',
          100: '#daefff',
          200: '#bee3ff',
          300: '#91d2ff',
          400: '#5db8ff',
          500: '#389aff',
          600: '#1d79f5',
          700: '#1563e1',
          800: '#1851b6',
          900: '#1a458f',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      boxShadow: {
        'soft': '0 1px 2px 0 rgb(15 27 61 / 0.04), 0 4px 16px -2px rgb(15 27 61 / 0.06)',
        'card': '0 1px 3px 0 rgb(15 27 61 / 0.05), 0 8px 24px -6px rgb(15 27 61 / 0.08)',
        'lift': '0 4px 8px -2px rgb(15 27 61 / 0.08), 0 16px 40px -8px rgb(15 27 61 / 0.12)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-scale': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.7' },
          '70%': { transform: 'scale(1.1)', opacity: '0' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        'shimmer': {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-scale': 'fade-in-scale 0.3s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
