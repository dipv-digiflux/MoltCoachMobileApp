/**
 * Border radius tokens.
 * All values (except `none` and `full`) are pre-scaled via `moderateScale`.
 */
import { moderateScale } from './scaling';

export const radius = {
  none: 0,
  xs: moderateScale(2),
  sm: moderateScale(4),
  md: moderateScale(8),
  lg: moderateScale(12),
  xl: moderateScale(16),
  pill: moderateScale(38),
  '2xl': moderateScale(20),
  // 22px — used for circular avatar containers in contact rows
  '3xl': moderateScale(22),
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
