import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          200: '#F2F2F2',
          300: '#C4C4CC',
          500: '#545D61',
          600: '#4E4E4E',
          800: '#202024',
          900: '#121214',
        },

        green: {
          700: '#00875F',
          600: '#03996C',
        },
      },

      fontFamily: {
        sans: ['var(--font-open-sans)', 'sans-serif', ...fontFamily.sans],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
