/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // WARDOM Studio Signature Brand Palette
        primary: '#5F8D3B',
        accent: '#7BAE47',
        dark: '#111111',
        muted: '#666666',
        subtleText: '#8E8E93',
        borderLight: '#EAEAEA',
        bgLight: '#F9FAFB',
        cardWhite: '#FFFFFF',

        // Backward compatibility fallbacks for existing components/admin
        ink: '#111111',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        surfaceElevated: '#F9FAFB',
        primaryText: '#111111',
        secondaryText: '#666666',
        border: '#EAEAEA',
        cream: '#FFFFFF',
        clay: '#5F8D3B',
        gold: '#7BAE47',
      },
      borderRadius: {
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        pill: '9999px',
      },
      spacing: {
        8: '8px',
        16: '16px',
        24: '24px',
        32: '32px',
        48: '48px',
        64: '64px',
        96: '96px',
        128: '128px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0, 0, 0, 0.04)',
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        cardHover: '0 16px 40px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        greenGlow: '0 8px 24px -4px rgba(95, 141, 59, 0.3)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        500: '500ms',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Grotesk"', 'monospace'],
      },
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [],
}

