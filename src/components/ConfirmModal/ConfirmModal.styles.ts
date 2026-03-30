import { StyleSheet } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

export default StyleSheet.create({
  glassOverlay: {
    flex: 1,
    backgroundColor: colors.OverlayDarkHalf,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['Spacing-5xl'],
  },
  container: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.sm,
    padding: spacing['Spacing-6xl'],
    alignItems: 'center',
    width: '100%',
    maxWidth: moderateScale(340),
  },
  iconContainer: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: radius.full,
    backgroundColor: colors.PrimaryMain,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['Spacing-7xl'],
  },
  title: {
    ...typography.h8Bold,
    color: colors.TextPrimaryDefault,
    textAlign: 'center',
    marginBottom: spacing['Spacing-l'],
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
    // lineHeight removed to use typography token default
    marginBottom: spacing['Spacing-10xl'],
  },
  buttonContainer: {
    width: '100%',
    gap: spacing['Spacing-l'],
  },
});
