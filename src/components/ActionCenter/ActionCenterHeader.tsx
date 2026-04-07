import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { ActionCenterHeaderProps } from './ActionCenter.types';

export const ActionCenterHeader = ({
  title,
  onViewAll,
}: ActionCenterHeaderProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={onViewAll} accessibilityRole="button">
        <Text style={styles.viewAll}>View all</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-4xl'],
  },
  title: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDisabled,
    textTransform: 'capitalize',
  },
  viewAll: {
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
    textDecorationLine: 'underline',
    textDecorationColor: colors.TextPrimaryDisabled,
  },
});
