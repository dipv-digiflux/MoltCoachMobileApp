import { type TextStyle } from 'react-native';

import {
  colors,
  iconScale,
  moderateScale,
  spacingScale,
  typographyByWeight,
} from '@/theme';

import {
  type ButtonVariant,
  type ButtonInteractionState,
  type ButtonSize,
} from './Button.types';

// ─── Button-specific colour tokens (not in main theme) ─────────────

const BRAND_HOVER_BORDER = '#5546FF';
const FOCUS_RING_BRAND = '#CEDAFA';
const FOCUS_RING_NEUTRAL = colors.TextPrimaryDisabled; // #9CA3AF
const FOCUS_RING_DESTRUCTIVE = 'rgba(240, 62, 63, 0.3)';

// ─── State colour definitions ───────────────────────────────────────

export type ButtonStateColors = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
  focusRingColor: string;
  spinnerColor: string;
};

type VariantStateMap = Record<ButtonInteractionState, ButtonStateColors>;

/**
 * Complete colour matrix for every variant × interaction-state combination.
 * Values are taken pixel-for-pixel from the Figma source.
 */
export const VARIANT_STATE_COLORS: Record<ButtonVariant, VariantStateMap> = {
  // ── Primary ────────────────────────────────────────────────────────
  primary: {
    default: {
      backgroundColor: colors.PrimaryMain,
      borderColor: colors.PrimarySecondary,
      textColor: colors.StatesWhite,
      iconColor: colors.StatesWhite,
      focusRingColor: 'transparent',
      spinnerColor: colors.StatesWhite,
    },
    hover: {
      backgroundColor: colors.PrimarySecondary,
      borderColor: BRAND_HOVER_BORDER,
      textColor: colors.StatesWhite,
      iconColor: colors.StatesWhite,
      focusRingColor: 'transparent',
      spinnerColor: colors.StatesWhite,
    },
    focus: {
      backgroundColor: colors.PrimaryMain,
      borderColor: colors.PrimarySecondary,
      textColor: colors.StatesWhite,
      iconColor: colors.StatesWhite,
      focusRingColor: FOCUS_RING_BRAND,
      spinnerColor: colors.StatesWhite,
    },
    loading: {
      backgroundColor: colors.PrimaryMain,
      borderColor: colors.PrimarySecondary,
      textColor: colors.StatesWhite,
      iconColor: colors.StatesWhite,
      focusRingColor: 'transparent',
      spinnerColor: colors.StatesWhite,
    },
    disabled: {
      backgroundColor: colors.StatesFill1,
      borderColor: colors.StatesDivider,
      textColor: colors.TextPrimaryDisabled,
      iconColor: colors.IconSecondaryDisabled,
      focusRingColor: 'transparent',
      spinnerColor: colors.TextPrimaryDisabled,
    },
  },

  // ── Secondary ──────────────────────────────────────────────────────
  secondary: {
    default: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderColor: colors.SurfaceSecondaryHover,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    hover: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderColor: colors.SurfaceSecondaryHover,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    focus: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderColor: 'transparent',
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: FOCUS_RING_NEUTRAL,
      spinnerColor: colors.PrimaryMain,
    },
    loading: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderColor: colors.SurfaceSecondaryHover,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    disabled: {
      backgroundColor: colors.StatesWhite,
      borderColor: colors.BorderPrimaryDisabled,
      textColor: colors.TextPrimaryDisabled,
      iconColor: colors.IconSecondaryDisabled,
      focusRingColor: 'transparent',
      spinnerColor: colors.TextPrimaryDisabled,
    },
  },

  // ── Minimal ────────────────────────────────────────────────────────
  minimal: {
    default: {
      backgroundColor: 'transparent',
      borderColor: colors.StatesOutline,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    hover: {
      backgroundColor: colors.SurfaceSecondaryDefault,
      borderColor: colors.StatesOutline,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    focus: {
      backgroundColor: 'transparent',
      borderColor: colors.StatesOutline,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: FOCUS_RING_NEUTRAL,
      spinnerColor: colors.PrimaryMain,
    },
    loading: {
      backgroundColor: 'transparent',
      borderColor: colors.StatesOutline,
      textColor: colors.PrimaryMain,
      iconColor: colors.PrimaryMain,
      focusRingColor: 'transparent',
      spinnerColor: colors.PrimaryMain,
    },
    disabled: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: colors.TextPrimaryDisabled,
      iconColor: colors.IconSecondaryDisabled,
      focusRingColor: 'transparent',
      spinnerColor: colors.TextPrimaryDisabled,
    },
  },

  // ── Destructive ────────────────────────────────────────────────────
  destructive: {
    default: {
      backgroundColor: colors.FeedbackWarningSurface,
      borderColor: colors.FeedbackWarningBorder,
      textColor: colors.FeedbackWarningText,
      iconColor: colors.FeedbackWarningText,
      focusRingColor: 'transparent',
      spinnerColor: colors.FeedbackWarningText,
    },
    hover: {
      backgroundColor: colors.FeedbackWarningSurface,
      borderColor: colors.FeedbackWarningText,
      textColor: colors.FeedbackWarningText,
      iconColor: colors.FeedbackWarningText,
      focusRingColor: 'transparent',
      spinnerColor: colors.FeedbackWarningText,
    },
    focus: {
      backgroundColor: colors.FeedbackWarningSurface,
      borderColor: colors.FeedbackWarningText,
      textColor: colors.FeedbackWarningText,
      iconColor: colors.FeedbackWarningText,
      focusRingColor: FOCUS_RING_DESTRUCTIVE,
      spinnerColor: colors.FeedbackWarningText,
    },
    loading: {
      backgroundColor: colors.FeedbackWarningSurface,
      borderColor: colors.FeedbackWarningBorder,
      textColor: colors.FeedbackWarningText,
      iconColor: colors.FeedbackWarningText,
      focusRingColor: 'transparent',
      spinnerColor: colors.FeedbackWarningText,
    },
    disabled: {
      backgroundColor: colors.StatesWhite,
      borderColor: colors.BorderPrimaryDisabled,
      textColor: colors.TextPrimaryDisabled,
      iconColor: colors.IconSecondaryDisabled,
      focusRingColor: 'transparent',
      spinnerColor: colors.TextPrimaryDisabled,
    },
  },
};

// ─── Size configuration ─────────────────────────────────────────────

export type ButtonSizeConfig = {
  height: number;
  paddingHorizontal: number;
  iconSize: number;
  gap: number;
  borderRadius: number;
  iconOnlySize: number;
  labelStyle: TextStyle;
};

/**
 * Size tokens extracted from the Figma design.
 * All dimensional values are responsively scaled.
 *
 * | Size    | Height | px  | Font          | Icon  | Icon-only |
 * |---------|--------|-----|---------------|-------|-----------|
 * | small   | 32     | 10  | bodySmall1/sb | 16    | 32        |
 * | default | 44     | 12  | bodySmall1/sb | 20    | 40        |
 * | large   | 52     | 12  | b1/sb         | 24    | 48        |
 */
export const SIZE_CONFIG: Record<ButtonSize, ButtonSizeConfig> = {
  small: {
    height: moderateScale(32),
    paddingHorizontal: spacingScale(10),
    iconSize: iconScale(16),
    gap: spacingScale(4),
    borderRadius: moderateScale(2),
    iconOnlySize: moderateScale(32),
    labelStyle: typographyByWeight.bodySmall1.semiBold,
  },
  default: {
    height: moderateScale(44),
    paddingHorizontal: spacingScale(12),
    iconSize: iconScale(20),
    gap: spacingScale(4),
    borderRadius: moderateScale(2),
    iconOnlySize: moderateScale(40),
    labelStyle: typographyByWeight.bodySmall1.semiBold,
  },
  large: {
    height: moderateScale(52),
    paddingHorizontal: spacingScale(12),
    iconSize: iconScale(24),
    gap: spacingScale(4),
    borderRadius: moderateScale(2),
    iconOnlySize: moderateScale(48),
    labelStyle: typographyByWeight.b1.semiBold,
  },
};

/** Content opacity applied in the loading state (background stays solid). */
export const LOADING_CONTENT_OPACITY = 0.3;

/** Width of the focus ring that appears around the button on focus. */
export const FOCUS_RING_WIDTH = 2;
