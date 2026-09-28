import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#05070D',
          900: '#070A12',
          850: '#0B0F1C',
          800: '#0D1527',
          750: '#111B32',
          700: '#162340',
          600: '#1F3159',
        },
        brand: {
          orange: '#FF6B00',
          amber: '#F97316',
          light: '#FFA04D',
          dark: '#CC5500',
          glow: 'rgba(255, 107, 0, 0.45)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'var(--font-jakarta)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px rgba(255, 107, 0, 0.4)',
        'glow-orange-lg': '0 0 45px rgba(255, 107, 0, 0.55)',
        'card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(255, 107, 0, 0.15) 0%, transparent 70%)',
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
