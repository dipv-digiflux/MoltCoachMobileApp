/**
 * Spacing tokens.
 * All values are pre-scaled via `spacingScale` — consumers do NOT need
 * to call any scaling function themselves.
 */
import { spacingScale } from './scaling';

export const spacing = {
  'Spacing-xs': 0,
  'Spacing-sm': spacingScale(2),
  'Spacing-m': spacingScale(4),
  'Spacing-l': spacingScale(6),
  'Spacing-xl': spacingScale(8),
  'Spacing-2xl': spacingScale(10),
  'Spacing-3xl': spacingScale(12),
  'Spacing-4xl': spacingScale(14),
  'Spacing-5xl': spacingScale(16),
  'Spacing-6xl': spacingScale(18),
  'Spacing-7xl': spacingScale(20),
  'Spacing-8xl': spacingScale(22),
  'Spacing-10xl': spacingScale(24),
  'Spacing-11xl': spacingScale(32),
  'Spacing-12xl': spacingScale(36),
  'Spacing-13xl': spacingScale(40),
  'Spacing-14xl': spacingScale(44),
  'Spacing-15xl': spacingScale(48),
  'Spacing-16xl': spacingScale(52),
} as const;

export type SpacingToken = keyof typeof spacing;
