import { StyleSheet } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  header: {
    height: moderateScale(56),
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-15xl'],
  },
  iconContainer: {
    marginTop: spacing['Spacing-10xl'],
    marginBottom: spacing['Spacing-5xl'],
  },
  title: {
    ...typography.h6Bold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-3xl'],
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-11xl'],
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    padding: spacing['Spacing-5xl'],
    marginBottom: spacing['Spacing-8xl'],
  },
  row: {
    flexDirection: 'row',
    gap: spacing['Spacing-4xl'],
  },
  rowIconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.StatesFill1,
    borderRadius: moderateScale(6),
  },
  rowTextContainer: {
    flex: 1,
  },
  rowLabel: {
    ...typography.bodySmall2Medium,
    color: colors.IconTertiarySubtle,
    marginBottom: spacing['Spacing-sm'],
  },
  rowValue: {
    ...typography.b2Medium,
    color: colors.OverlayDark,
  },
  rowSubValue: {
    ...typography.bodySmall4Regular,
    color: colors.IconTertiarySubtle,
  },
  divider: {
    height: 1,
    backgroundColor: colors.StatesDivider,
    marginVertical: spacing['Spacing-5xl'],
    marginLeft: spacing['Spacing-14xl'],
  },
  calendarButtons: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
  },
  calendarButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-2xl'],
    height: moderateScale(44),
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    backgroundColor: colors.SurfaceSubtleDefault,
  },
  calendarButtonText: {
    ...typography.bodySmall1Medium,
    color: colors.OverlayDark,
  },
  calendarButtonIcon: {
    marginRight: spacing['Spacing-2xl'],
  },
  footer: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
  },
  footerActionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.AccentOrangeLight,
    padding: spacing['Spacing-4xl'],
    borderRadius: radius.md,
    gap: spacing['Spacing-3xl'],
  },
  footerDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: radius.sm,
    backgroundColor: colors.AccentOrangeDark,
  },
  footerTextContainer: {
    flex: 1,
  },
  footerTitle: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  footerSubText: {
    ...typography.bodySmall3Regular,
    color: colors.TextPrimaryDefault,
  },
  logoutLink: {
    ...typography.bodySmall1Regular,
    color: colors.TextPrimaryDefault,
    textDecorationLine: 'underline',
  },
});
