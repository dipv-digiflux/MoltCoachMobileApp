import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BlackBackgroundCheckSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

export const BookingConfirmHeader = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <BlackBackgroundCheckSvg
        width={40}
        height={40}
        color={colors.PrimaryMain}
      />
      <Text style={styles.title}>{translation.bookingConfirmMainText}</Text>
      <Text style={styles.subtitle}>{translation.bookingConfirmSubText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-11xl'], // 32px top
    paddingBottom: spacing['Spacing-11xl'], // 32px bottom
    paddingHorizontal: spacing['Spacing-5xl'], // 16px left/right
    gap: spacing['Spacing-2xl'], // 10px gap between icon, title, and subtitle
    alignItems: 'flex-start',
    backgroundColor: colors.StatesWhite,
  },
  title: {
    ...typography.h6SemiBold, // 28px / 34px, SemiBold, Inter
    color: colors.PrimaryMain, // #101610
  },
  subtitle: {
    ...typography.bodySmall1Regular, // 14px / 16px, Regular, Inter
    color: colors.TextSecondaryDefault, // #64748B
  },
});
