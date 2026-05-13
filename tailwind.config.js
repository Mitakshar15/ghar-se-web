/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'serif-italic': ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        green: {
          DEFAULT: '#0B5D4D',
          dark: '#063C32',
          mid: '#147A66',
          light: '#E8F3F0',
          lighter: '#F4F9F7',
        },
        saffron: {
          DEFAULT: '#F25F0C',
          dark: '#D14906',
          light: '#FFF0E5',
        },
        brass: {
          DEFAULT: '#C8A04D',
          dark: '#9C7A2F',
          light: '#FAF3E0',
        },
        ink: {
          DEFAULT: '#171717',
          2: '#525252',
          3: '#9CA3AF',
          4: '#D4D4D4',
        },
        cream: {
          DEFAULT: '#FBF7F0',
          dark: '#F5EFE0',
        },
        canvas: {
          DEFAULT: '#FFFFFF',
          2: '#FAFAF9',
          3: '#F4F4F2',
        },
        line: {
          DEFAULT: '#EBEAE5',
          soft: '#F1F0EC',
          dark: '#D6D2C8',
        },
        veg: '#16A34A',
        danger: {
          DEFAULT: '#C53030',
          light: '#FEE2E2',
        },
      },
      maxWidth: {
        page: '1280px',
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'scale-in': { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        'slide-up': { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-in': 'fade-in .28s ease-out both',
        'fade-up': 'fade-up .32s cubic-bezier(.16,1,.3,1) backwards',
        'scale-in': 'scale-in .25s cubic-bezier(.16,1,.3,1) both',
        'slide-up': 'slide-up .3s cubic-bezier(.16,1,.3,1) both',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};
