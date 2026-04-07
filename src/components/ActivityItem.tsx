import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import { ActivityItemProps } from './ActivityItem.types';

export const ActivityItem = ({
  type,
  time,
  value,
  subValue,
  containerStyle,
}: ActivityItemProps): ReactElement => {
  return (
    <View style={[styles.activityRow, containerStyle]}>
      <View style={styles.activityInfo}>
        <Text style={styles.activityType}>{type}</Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
      <View style={styles.activityValueBlock}>
        <Text style={styles.activityValue}>{value}</Text>
        <Text style={styles.activitySubValue}>{subValue}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    paddingHorizontal: spacing['Spacing-xl'],
  },
  activityInfo: {
    gap: spacing['Spacing-xs'],
  },
  activityType: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  activityTime: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  activityValueBlock: {
    alignItems: 'flex-end',
    gap: spacing['Spacing-xs'],
  },
  activityValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  activitySubValue: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
});
