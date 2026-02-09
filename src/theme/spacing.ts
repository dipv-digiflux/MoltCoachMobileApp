/**
 * Spacing tokens from design system (Mobile).
 * Use for margins, padding, gaps. Values in pixels.
 */

export const spacing = {
  /** Spacing-xs */
  xs: 0,
  /** Spacing-sm */
  sm: 2,
  /** Spacing-m */
  m: 4,
  /** Spacing-l */
  l: 6,
  /** Spacing-xl */
  xl: 8,
  /** Spacing-2xl */
  xl2: 10,
  /** Spacing-3xl */
  xl3: 12,
  /** Spacing-4xl */
  xl4: 14,
  /** Spacing-5xl */
  xl5: 16,
  /** Spacing-6xl */
  xl6: 18,
  /** Spacing-7xl */
  xl7: 20,
  /** Spacing-8xl */
  xl8: 22,
  /** Spacing-10xl */
  xl10: 24,
  /** Spacing-11xl */
  xl11: 32,
  /** Spacing-12xl */
  xl12: 36,
  /** Spacing-13xl */
  xl13: 40,
  /** Spacing-14xl */
  xl14: 44,
  /** Spacing-15xl */
  xl15: 48,
  /** Spacing-16xl */
  xl16: 52,
} as const;

export type SpacingToken = keyof typeof spacing;
