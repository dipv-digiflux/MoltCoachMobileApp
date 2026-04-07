import { StyleSheet } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.StatesWhite,
    },
    contentContainerStyle: {
      flexGrow: 1,
      paddingHorizontal: spacing['Spacing-5xl'],
      paddingBottom: spacing['Spacing-10xl'],
    },
    headerSection: {
      alignItems: 'center',
      paddingTop: moderateScale(40),
      marginBottom: spacing['Spacing-12xl'],
    },
    title: {
      ...typography.h7Bold,
      color: colors.TextPrimaryHover,
      marginTop: spacing['Spacing-10xl'],
      textAlign: 'center',
    },
    subtitle: {
      ...typography.b2TallRegular,
      color: colors.BorderPrimaryActive, // #6B7280 used as text color here
      marginTop: spacing['Spacing-m'],
      textAlign: 'center',
      paddingHorizontal: spacing['Spacing-10xl'],
    },
    primaryButton: {
      marginBottom: spacing['Spacing-m'],
    },
  });
