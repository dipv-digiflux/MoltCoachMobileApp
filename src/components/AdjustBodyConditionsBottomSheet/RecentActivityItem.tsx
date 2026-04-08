import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import type { RecentActivityItemProps } from './RecentActivityItem.types';

export const RecentActivityItem = ({
  activity,
  isLast,
}: RecentActivityItemProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const typeLabel =
    activity.type === 'Added'
      ? translation.adjustBodyConditionsAddedLabel
      : translation.adjustBodyConditionsRemoveLabel;

  return (
    <View style={[styles.container, !isLast && styles.border]}>
      <View style={styles.leftContent}>
        <Text style={styles.typeText}>{typeLabel}</Text>
        <Text style={styles.timestampText}>{activity.timestamp}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.conditionText}>{activity.conditionName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  leftContent: {
    flex: 1,
    gap: spacing['Spacing-xs'],
  },
  typeText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  timestampText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  rightContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  conditionText: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    textAlign: 'right',
  },
});
