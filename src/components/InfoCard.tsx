import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, spacing, typography, radius, moderateScale } from '@/theme';

import type { InfoCardProps } from '@/types/components.types';

export const InfoCard = ({ text }: InfoCardProps): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: spacing['Spacing-l'],
    paddingHorizontal: spacing['Spacing-2xl'],
    gap: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
    backgroundColor: colors.SurfacePrimaryDefault,
    borderRadius: radius.sm,
  },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: radius.full,
    backgroundColor: colors.MatrixMain,
  },
  text: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
    flex: 1,
  },
});
