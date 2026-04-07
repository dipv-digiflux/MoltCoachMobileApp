import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { ProfileStatItemProps } from './ProfileStatItem.types';

export const ProfileStatItem = ({
  label,
  value,
  containerStyle,
}: ProfileStatItemProps): React.ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing['Spacing-xl'],
    minWidth: '30%',
  },
  label: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-xs'],
  },
  value: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
});
