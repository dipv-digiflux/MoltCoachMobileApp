import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

export const RequestAccessHeader = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{translation.requestAccessHeaderTitle}</Text>
      <Text style={styles.subtitle}>
        {translation.requestAccessHeaderSubtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-11xl'], // 32px top
    paddingBottom: spacing['Spacing-11xl'], // 32px bottom
    gap: spacing['Spacing-5xl'], // 16px gap between title and subtitle
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
