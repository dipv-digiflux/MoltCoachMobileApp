import { StyleSheet } from 'react-native';

import { colors, moderateScale, radius, spacing, typography } from '@/theme';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.StatesWhite,
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing['Spacing-10xl'],
      paddingTop: moderateScale(80),
    },
    headerSection: {
      alignItems: 'center',
      marginBottom: spacing['Spacing-12xl'],
    },
    title: {
      ...typography.h7Bold,
      color: colors.TextPrimaryDefault,
      marginTop: spacing['Spacing-10xl'],
      textAlign: 'center',
    },
    stepperSection: {
      marginBottom: spacing['Spacing-16xl'],
      paddingHorizontal: spacing['Spacing-xl'],
    },
    infoBox: {
      flexDirection: 'row',
      backgroundColor: colors.SurfaceSecondaryDefault,
      padding: spacing['Spacing-5xl'],
      borderRadius: radius.xs,
      width: '100%',
      alignItems: 'flex-start',
      gap: spacing['Spacing-m'],
    },
    infoIcon: {
      marginTop: moderateScale(2),
    },
    infoText: {
      ...typography.bodySmall1Regular,
      color: colors.TextSecondaryDefault,
      flex: 1,
    },
    footer: {
      paddingHorizontal: spacing['Spacing-7xl'],
      width: '100%',
    },
    primaryButton: {
      marginBottom: spacing['Spacing-l'],
    },
  });
