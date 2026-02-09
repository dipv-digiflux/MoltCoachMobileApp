/**
 * Responsive scaling utilities.
 *
 * All helpers are calibrated to a **390 × 844** base (iPhone 12 / 13).
 * They read the current window dimensions at call-time, so pre-computed
 * token values (spacing, typography, radius) are resolved once at module
 * load — which is the standard approach for React Native apps.
 *
 * @example
 * import { fontScale, spacingScale, moderateScale } from '@/theme';
 *
 * const styles = StyleSheet.create({
 *   container: { padding: spacingScale(16) },
 *   title:     { fontSize: fontScale(24), lineHeight: lineHeightScale(28) },
 *   card:      { height: moderateScale(120), borderRadius: moderateScale(12) },
 * });
 */
import { Dimensions, PixelRatio, Platform } from 'react-native';

// ─── Screen tracking ────────────────────────────────────────────────

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

/** Keep values current after orientation / fold changes. */
Dimensions.addEventListener('change', ({ window }) => {
  screenWidth = window.width;
  screenHeight = window.height;
});

// ─── Base design dimensions ─────────────────────────────────────────

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// ─── Core scaling ───────────────────────────────────────────────────

/** Scale linearly by screen-width ratio. */
export const scale = (size: number): number =>
  (screenWidth / BASE_WIDTH) * size;

/** Scale linearly by screen-height ratio. */
export const verticalScale = (size: number): number =>
  (screenHeight / BASE_HEIGHT) * size;

/**
 * Moderate (blended) scaling — the recommended default.
 *
 * @param size   Design-time pixel value.
 * @param factor 0 = no scaling, 1 = full `scale()`. Default **0.5**.
 */
export const moderateScale = (size: number, factor = 0.5): number =>
  size + (scale(size) - size) * factor;

// ─── Domain-specific helpers ────────────────────────────────────────

/**
 * Font-size scaling with platform compensation and pixel rounding.
 * Android fonts render ~3 % larger, so a 0.97 multiplier is applied.
 */
export const fontScale = (size: number): number => {
  const adjusted = size * (Platform.OS === 'ios' ? 1 : 0.97);
  return PixelRatio.roundToNearestPixel(moderateScale(adjusted));
};

/** Line-height scaling with pixel rounding. */
export const lineHeightScale = (size: number): number =>
  PixelRatio.roundToNearestPixel(moderateScale(size));

/**
 * Spacing scaling (padding, margin, gap).
 * Uses a gentler factor (**0.3**) so white-space grows less aggressively.
 */
export const spacingScale = (value: number, factor = 0.3): number =>
  PixelRatio.roundToNearestPixel(moderateScale(value, factor));

/**
 * Icon-size scaling with pixel rounding.
 * Uses the default moderate factor (**0.5**).
 */
export const iconScale = (size: number): number =>
  PixelRatio.roundToNearestPixel(moderateScale(size));

// ─── Screen dimensions ─────────────────────────────────────────────

/** Returns current window dimensions (updates after orientation change). */
export const getScreenDimensions = (): {
  width: number;
  height: number;
} => ({
  width: screenWidth,
  height: screenHeight,
});
