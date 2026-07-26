export const typography = {
  family: {
    sans: '"General Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    serif: '"Cormorant Garamond", "Iowan Old Style", "Palatino Linotype", serif',
    mono: '"Space Grotesk", "SFMono-Regular", monospace',
  },
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
  },
  size: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
    '5xl': '3.5rem',
  },
  lineHeight: {
    tight: 1.05,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;
