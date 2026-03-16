import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F1FC',
          100: '#A8C8F0',
          200: '#6FA3E4',
          400: '#3B7DDD',
          600: '#2A5BA6',
          800: '#1A3D70',
          900: '#0F2544',
          DEFAULT: '#3B7DDD',
        },
        accent: {
          50: '#FEF3DC',
          100: '#FACB75',
          200: '#F7B74A',
          400: '#F5A623',
          600: '#C4841C',
          800: '#7A5211',
          900: '#4A2E05',
          DEFAULT: '#F5A623',
        },
        success: {
          50: '#E0F5EC',
          100: '#7DCBAA',
          200: '#4DB88C',
          400: '#2D9B6E',
          600: '#1F7050',
          800: '#134533',
          DEFAULT: '#2D9B6E',
        },
        danger: {
          50: '#FCE8EC',
          100: '#F2A3B1',
          200: '#ED7E90',
          400: '#E85D75',
          600: '#B94459',
          800: '#7A2D3B',
          DEFAULT: '#E85D75',
        },
        magic: {
          50: '#EDE8FE',
          100: '#BBA8FA',
          200: '#A38CF8',
          400: '#8B5CF6',
          600: '#6A3FCC',
          800: '#452A88',
          DEFAULT: '#8B5CF6',
        },
        surface: {
          primary: '#F8F7F4',
          secondary: '#EDE9E3',
          tertiary: '#E2DDD5',
          elevated: '#FFFFFF',
        },
        ink: {
          primary: '#2C2C2A',
          secondary: '#6B6B66',
          tertiary: '#9C9A92',
          inverse: '#F8F7F4',
        },
      },
      fontFamily: {
        display: ['Nunito', 'Quicksand', 'sans-serif'],
        body: ['Nunito', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 1px 2px rgba(44,44,42,0.06)',
        md: '0 4px 12px rgba(44,44,42,0.08)',
        lg: '0 8px 24px rgba(44,44,42,0.12)',
        'glow-accent': '0 0 20px rgba(245,166,35,0.3)',
        'glow-magic': '0 0 20px rgba(139,92,246,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
