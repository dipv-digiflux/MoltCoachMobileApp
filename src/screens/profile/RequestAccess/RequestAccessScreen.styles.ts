import { StyleSheet } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-11xl'],
    gap: spacing['Spacing-11xl'],
  },
  logoutCard: {
    marginTop: spacing['Spacing-3xl'],
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
  submitButton: {
    alignSelf: 'stretch',
    marginTop: spacing['Spacing-5xl'],
  },
});
