import { StyleSheet } from 'react-native';

import { borderWidth, colors, radius, spacing, typography } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: borderWidth.hairline,
    borderBottomColor: colors.StatesDivider,
    paddingTop: spacing['Spacing-2_5xl'], // 11px
    paddingRight: spacing['Spacing-5xl'], // 16px
    paddingBottom: spacing['Spacing-3xl'], // 12px
    paddingLeft: spacing['Spacing-5xl'], // 16px
  },
  avatarAndTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: radius['2xl'], // 20px
    overflow: 'hidden',
    marginRight: spacing['Spacing-3xl'], // 12px gap to text
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    ...typography.b2TallSemiBold,
    color: colors.TextPrimaryDefault,
  },
  phoneText: {
    marginTop: spacing['Spacing-1'], // 1px visual gap
    ...typography.bodySmall4TallRegular,
    color: colors.TextSecondaryDefault,
  },
  checkIconWrapper: {
    marginLeft: spacing['Spacing-3xl'], // 12px from text block
  },
});
