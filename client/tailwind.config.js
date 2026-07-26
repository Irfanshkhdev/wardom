/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        background: '#080808',
        surface: '#101010',
        surfaceElevated: '#181818',
        primaryText: '#FFFFFF',
        secondaryText: '#B4B4B4',
        border: 'rgba(255,255,255,0.08)',
        accent: '#E7B96A',
        cream: '#FFFFFF',
        clay: '#E7B96A',
        gold: '#E7B96A',
      },
      borderRadius: {
        sm: '12px',
        md: '18px',
        lg: '28px',
        pill: '9999px',
      },
      spacing: {
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
        96: '96px',
        128: '128px',
      },
      boxShadow: {
        soft: '0 1px 0 rgba(255,255,255,0.03), 0 8px 24px rgba(0,0,0,0.18)',
        elevated: '0 1px 0 rgba(255,255,255,0.04), 0 14px 36px rgba(0,0,0,0.22)',
        subtle: '0 0 0 1px rgba(255,255,255,0.04)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(.22,1,.36,1)',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"General Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'sans-serif'],
      },
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
