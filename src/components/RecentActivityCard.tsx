import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';
import { SessionActivity } from '@/types/components.types';

import { RecentActivityCardProps } from './RecentActivityCard.types';

export const RecentActivityCard = ({
  title = 'Recent activity',
  activities,
}: RecentActivityCardProps): React.ReactElement | null => {
  if (!activities || activities.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {activities.map((activity, index) => (
        <View
          key={index}
          style={[
            styles.activityItem,
            index === activities.length - 1 && styles.lastActivityItem,
          ]}
        >
          <View style={styles.activityMain}>
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <Text style={styles.activityTimestamp}>{activity.timestamp}</Text>
          </View>
          <View style={styles.activityRight}>
            <Text style={styles.activityValue}>{activity.value}</Text>
            <Text style={styles.activityPrevious}>
              From {activity.previousValue}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing['Spacing-3xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-xl'],
    borderWidth: 1,
    borderColor: colors.StatesDivider,
    borderRadius: moderateScale(4),
    paddingTop: spacing['Spacing-3xl'],
    backgroundColor: colors.StatesWhite,
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-xl'],
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesDivider,
  },
  lastActivityItem: {
    borderBottomWidth: 0,
  },
  activityMain: {
    flex: 1,
    gap: spacing['Spacing-xs'],
  },
  activityLabel: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activityTimestamp: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  activityRight: {
    alignItems: 'flex-end',
    gap: spacing['Spacing-xs'],
  },
  activityValue: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  activityPrevious: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
});
