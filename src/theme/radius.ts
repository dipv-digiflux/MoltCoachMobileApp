/**
 * Border radius tokens.
 * All values (except `none` and `full`) are pre-scaled via `moderateScale`.
 */
import { moderateScale } from './scaling';

export const radius = {
  none: 0,
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
