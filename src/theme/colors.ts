export const colors = {
  // ── Primary ──────────────────────────────────────────────
  PrimaryMain: '#101610',
  PrimarySecondary: '#585C58',

  // ── States ───────────────────────────────────────────────
  StatesOutline: '#EBEBEB',
  StatesDivider: '#F3F3F3',
  StatesFill1: '#F5F6F5',
  StatesFill2: '#FDFDFD',
  StatesWhite: '#FFFFFF',
  TabBarGlassFallback: '#FDFDFD',

  // ── Main ───────────────────────────────────────────────
  MatrixMain: '#159945',

  // ── Surface Primary ──────────────────────────────────────
  SurfacePrimaryDefault: '#F8FAFC',
  SurfacePrimaryHover: '#E2E8F0',
  SurfacePrimaryActive: '#CBD5E1',
  SurfacePrimaryPressed: '#E2E8F0',
  SurfacePrimaryFocused: '#EEF2F6',
  SurfacePrimaryDisabled: '#F1F5F9',

  // ── Surface Secondary ────────────────────────────────────
  SurfaceSecondaryDefault: '#F9FAFB',
  SurfaceSecondaryHover: '#E5E7EB',
  SurfaceSecondaryActive: '#D1D5DB',
  SurfaceSecondaryPressed: '#E5E7EB',
  SurfaceSecondaryFocused: '#F2F3F6',
  SurfaceSecondaryDisabled: '#F3F4F6',

  // ── Surface Subtle ───────────────────────────────────────
  SurfaceSubtleDefault: '#FAFAFA',
  SurfaceSubtleHover: '#E5E5E5',
  SurfaceSubtleActive: '#D4D4D4',
  SurfaceSubtlePressed: '#E5E5E5',
  SurfaceSubtleFocused: '#F4F1F1',
  SurfaceSubtleDisabled: '#F5F5F5',

  // ── Surface Search ───────────────────────────────────────
  SurfaceSearchBackground: '#F5F7F8',

  // ── Text Primary ────────────────────────────────────────
  TextPrimaryDefault: '#030712',
  TextPrimaryHover: '#111827',
  TextPrimaryActive: '#1F2937',
  TextPrimaryStrong: '#0F1720',
  TextPrimaryDisabled: '#9CA3AF',

  // ── Text Secondary ──────────────────────────────────────
  TextSecondaryDefault: '#64748B',
  TextSecondaryHover: '#475569',
  TextSecondaryActive: '#1E293B',
  TextSecondaryDisabled: '#94A3B8',

  /** Label text (e.g. form field labels). */
  TextLabelDefault: '#374151',

  // ── Icon Primary ────────────────────────────────────────
  IconPrimaryDefault: '#4B5563',
  IconPrimaryHover: '#374151',
  IconPrimaryActive: '#1F2937',
  IconPrimaryDisabled: '#9CA3AF',

  // ── Icon Secondary ──────────────────────────────────────
  IconSecondaryDefault: '#64748B',
  IconSecondaryHover: '#475569',
  IconSecondaryActive: '#1E293B',
  IconSecondaryDisabled: '#94A3B8',

  /** Calendar/date picker icon tint (e.g. Start Date input). */
  IconCalendarDefault: '#0F172B',

  // ── Icon Tertiary / Subtle ──────────────────────────────
  IconTertiarySubtle: '#919191',

  // ── Overlays / Subtle Dividers ──────────────────────────
  Transparent: 'transparent',
  DividerSubtleOverlay: '#00000014',
  OverlayDark: '#000000',
  OverlayDarkHalf: 'rgba(0, 0, 0, 0.5)',
  OverlayLight: 'rgba(255, 255, 255, 0.9)',
  OverlayLightGlass: 'rgba(255, 255, 255, 0.7)',
  BorderSubtleWhite: 'rgba(255, 255, 255, 0.05)',

  // ── Focus / Shadow ──────────────────────────────────────
  FocusRingBrand: '#CEDAFA',
  FocusRingSubtle: '#EDEFF5',
  FocusRingDestructive: 'rgba(240, 62, 63, 0.3)',
  ShadowDefault: '#000000',

  // ── Border Primary ──────────────────────────────────────
  BorderPrimaryDefault: '#D1D5DB',
  BorderPrimaryHover: '#9CA3AF',
  BorderPrimaryActive: '#6B7280',
  BorderPrimaryFocused: '#9CA3AF',
  BorderPrimaryDisabled: '#F3F4F6',

  // ── Border Secondary ────────────────────────────────────
  BorderSecondaryDefault: '#CBD5E1',
  BorderSecondaryHover: '#94A3B8',
  BorderSecondaryActive: '#64748B',
  BorderSecondaryFocused: '#94A3B8',
  BorderSecondaryDisabled: '#F1F5F9',

  // ── Feedback Warning ────────────────────────────────────
  FeedbackWarningSurface: '#FFEDF1',
  FeedbackWarningText: '#EA0C10',
  FeedbackWarningBorder: '#E23134',
  FeedbackWarningIcon: '#E64043',

  // ── Feedback Success ────────────────────────────────────
  FeedbackSuccessSurface: '#DCFCE7',
  FeedbackSuccessText: '#15803D',
  FeedbackSuccessBorder: '#16A34A',
  FeedbackSuccessIcon: '#17A24A',

  // ── Accent ──────────────────────────────────────────────
  AccentOrangeLight: '#FFF7ED',
  AccentOrangeDark: '#EA580C',
  AccentBlueLight: '#E5EBFA',
  AccentBlueDark: '#2563EB',
  AccentGoldenLight: '#FAF3E3',
  AccentGoldenDark: '#D5C191',
  AccentPinkLight: '#FFF6FA',
  AccentPinkDark: '#DC2777',
  AccentTealLight: '#F2FDFF',
  AccentTealDark: '#1B5D69',
  AccentRoyalBlue: '#0F0FA9',
  AccentMediumDarkBlue: '#5C6CF2',
  AccentBlueNavy: '#0E2E6B',
  AccentDeepBlue: '#123C8C',
  AccentYellowMustard: '#EAB308',
  AccentAmberDark: '#D97706',

  // ── Tags ────────────────────────────────────────────────
  TagSuccessSurface: '#DCFCE7',
  TagSuccessText: '#166534',
  TagWarningSurface: '#FFEDF1',
  TagErrorText: '#A33A3A',
  NeutralTealGrayIcon: '#6B7575',
  AccentDeepGreen: '#0B1A1A',
  AccentBrightGreen: '#22C55E',
} as const;

export type ColorToken = keyof typeof colors;
