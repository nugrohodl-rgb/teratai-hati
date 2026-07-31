/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd', // lavender accent
          400: '#a78bfa',
          500: '#8b5cf6', // soft purple
          600: '#6b38d4', // primary purple
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#2e1065',
        },
        surface: {
          DEFAULT: '#f9f9f8',
          dim: '#dadad9',
          bright: '#f9f9f8',
          lowest: '#ffffff',
          low: '#f3f4f3',
          container: '#eeeeed',
          high: '#e8e8e7',
          highest: '#e2e2e2',
          warm: '#f5f5f4',
          dark: '#1f192f',
        },
        roseAcc: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
        },
        mood: {
          emerald: '#10b981', // Sangat Baik
          blue: '#3b82f6',    // Baik
          yellow: '#f59e0b',  // Biasa
          orange: '#fb923c',  // Kurang Baik
          red: '#ef4444',     // Buruk
        },
        stoneText: {
          DEFAULT: '#1a1c1c',
          calm: '#44403c',
          muted: '#7b7486',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft': '0 20px 40px -15px rgba(107, 56, 212, 0.07)',
        'soft-lg': '0 25px 50px -12px rgba(107, 56, 212, 0.12)',
        'glow': '0 0 25px rgba(139, 92, 246, 0.25)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
