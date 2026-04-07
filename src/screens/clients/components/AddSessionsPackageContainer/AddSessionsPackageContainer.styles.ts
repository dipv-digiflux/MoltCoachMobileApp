import { StyleSheet } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStyles = (formBg: string) =>
  StyleSheet.create({
    outer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: spacing['Spacing-4xl'],
      gap: spacing['Spacing-5_5xl'],
      borderWidth: 1,
      borderColor: colors.StatesOutline,
      borderRadius: radius.xs,
      backgroundColor: colors.StatesWhite,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    title: {
      ...typography.bodySmall1TallSemiBold,
      color: colors.TextPrimaryStrong,
    },
    formContent: {
      width: '100%',
      gap: spacing['Spacing-5_5xl'],
    },
    chipRow: {
      flexDirection: 'row',
      gap: spacing['Spacing-3xl'],
    },
    chip: {
      paddingVertical: spacing['Spacing-xl'],
      paddingHorizontal: spacing['Spacing-3xl'],
      borderRadius: radius.xs,
      backgroundColor: colors.StatesWhite,
      borderWidth: 1,
      borderColor: colors.BorderPrimaryDefault,
    },
    chipActive: {
      backgroundColor: colors.StatesFill2,
      borderWidth: 1,
      borderColor: colors.TextPrimaryDefault,
    },
    chipText: {
      ...typography.bodySmall1SemiBold,
      color: colors.IconTertiarySubtle,
    },
    chipTextActive: {
      color: colors.TextPrimaryStrong,
    },
    inputsRow: {
      flexDirection: 'row',
      gap: spacing['Spacing-3xl'],
      width: '100%',
    },
    inputWrapper: {
      flex: 1,
    },
    calendarIconWrap: {
      paddingRight: spacing['Spacing-xl'],
    },
    inputBgStyle: {
      backgroundColor: formBg,
      borderWidth: 0,
    },
  });
