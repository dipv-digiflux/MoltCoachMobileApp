import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export const contactInfoRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing['Spacing-3xl'],
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    width: '100%',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-3xl'],
    flex: 1,
  },
  imageContainer: {
    borderRadius: radius['2xl'],
    overflow: 'hidden',
    backgroundColor: colors.SurfaceSecondaryDisabled,
  },
  placeholderContainer: {
    width: spacing['Spacing-14xl'],
    height: spacing['Spacing-14xl'],
    borderRadius: radius['2xl'],
    backgroundColor: colors.AccentBlueLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    ...typography.b2Bold,
    color: colors.AccentBlueDark,
  },
  image: {
    width: spacing['Spacing-14xl'],
    height: spacing['Spacing-14xl'],
    borderRadius: radius['2xl'],
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    ...typography.b2TallSemiBold,
    color: colors.TextPrimaryDefault,
  },
  phoneText: {
    ...typography.bodySmall4TallRegular,
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-1'],
  },
  checkbox: {
    marginLeft: spacing['Spacing-xl'],
  },
});
