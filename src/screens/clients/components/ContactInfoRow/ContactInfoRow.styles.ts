import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

export const contactInfoRowStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing['Spacing-3xl'],
  },
  imageContainer: {
    borderRadius: radius['2xl'], // 20px
    overflow: 'hidden',
  },
  image: {
    width: spacing['Spacing-14xl'],
    height: spacing['Spacing-14xl'],
    borderRadius: radius['2xl'],
  },
  textContainer: {},
  nameText: {
    ...typography.b2TallSemiBold, // 15px, 22.5px, Inter SemiBold
    color: colors.TextPrimaryDefault,
  },
  phoneText: {
    ...typography.bodySmall4TallRegular, // 13px, 19.5px, Inter Regular
    color: colors.TextSecondaryDefault,
    marginTop: spacing['Spacing-1'],
  },
});
