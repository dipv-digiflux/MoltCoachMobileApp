import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { StatusDot } from './StatusDot';

export const RequestAccessStatus = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.statusBox}>
      <View style={styles.statusDotContainer}>
        <StatusDot />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.statusTitle}>
          {translation.requestAccessStatusMainText}
        </Text>
        <Text style={styles.statusSubtext}>
          {translation.requestAccessStatusSubText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBox: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-l'],
    flexDirection: 'row',
    gap: spacing['Spacing-l'],
  },
  textContainer: {
    gap: spacing['Spacing-m'],
  },
  statusTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  statusSubtext: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  statusDotContainer: {
    paddingTop: spacing['Spacing-m'],
  },
});
