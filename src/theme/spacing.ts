export const spacing = {
  'Spacing-xs': 0,
  'Spacing-sm': 2,
  'Spacing-m': 4,
  'Spacing-l': 6,
  'Spacing-xl': 8,
  'Spacing-2xl': 10,
  'Spacing-3xl': 12,
  'Spacing-4xl': 14,
  'Spacing-5xl': 16,
  'Spacing-6xl': 18,
  'Spacing-7xl': 20,
  'Spacing-8xl': 22,
  'Spacing-10xl': 24,
  'Spacing-11xl': 32,
  'Spacing-12xl': 36,
  'Spacing-13xl': 40,
  'Spacing-14xl': 44,
  'Spacing-15xl': 48,
  'Spacing-16xl': 52,
} as const;

export type SpacingToken = keyof typeof spacing;
