export const colors = {
  background: '#080808',
  surface: '#101010',
  surfaceElevated: '#181818',
  primaryText: '#FFFFFF',
  secondaryText: '#B4B4B4',
  border: 'rgba(255,255,255,0.08)',
  accent: '#E7B96A',
} as const;

export const semanticColors = {
  canvas: colors.background,
  panel: colors.surface,
  panelElevated: colors.surfaceElevated,
  textPrimary: colors.primaryText,
  textSecondary: colors.secondaryText,
  borderSoft: colors.border,
  accent: colors.accent,
} as const;
