import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { borderWidth, colors, spacing, typography } from '@/theme';

import type { SelectContactsSectionHeaderProps } from './SelectContactsSectionHeader.types';

export const SelectContactsSectionHeader = ({
  label,
}: SelectContactsSectionHeaderProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-3xl'],
    paddingHorizontal: spacing['Spacing-5xl'], // 16px
    borderBottomWidth: borderWidth.hairline,
    borderTopWidth: borderWidth.hairline,
    borderTopColor: colors.DividerSubtleOverlay,
    borderBottomColor: colors.BorderPrimaryDefault,
    backgroundColor: colors.SurfaceSecondaryDisabled, // #F3F4F6
  },
  text: {
    ...typography.bodySmall4TallSemiBold,
    color: colors.TextSecondaryDefault,
  },
});
