import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, moderateScale, radius, spacing, typography } from '@/theme';

import type { EarningsSummaryCardProps } from './EarningsSummary.types';

export const EarningsSummaryCard = ({
  icon,
  title,
  credits,
  aedValue,
}: EarningsSummaryCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.creditsRow}>
          <Text style={styles.creditsValue}>{credits}</Text>
          <Text style={styles.creditsLabel}>
            {translation.earningsCreditsLabel}
          </Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>= {aedValue.toFixed(2)} AED</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(160),
    padding: spacing['Spacing-3xl'],
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    backgroundColor: colors.StatesWhite,
    gap: spacing['Spacing-5xl'],
  },
  iconWrapper: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: radius.xs,
    backgroundColor: colors.StatesFill1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    gap: spacing['Spacing-m'],
  },
  title: {
    ...typography.bodySmall2SemiBold,
    color: colors.PrimaryMain,
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing['Spacing-xs'],
  },
  creditsValue: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryHover,
  },
  creditsLabel: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  badge: {
    backgroundColor: colors.StatesFill1,
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-xs'],
    borderRadius: radius.xs,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
  },
});
