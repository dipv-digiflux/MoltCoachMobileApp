import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import { Badge } from './Badge/Badge';

export const EarningsTotalCard = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>
          {translation.earningsTotalEarningsTitle}
        </Text>
        <Text style={styles.rateText}>{translation.earningsCreditRate}</Text>
      </View>
      <View style={styles.secondaryContainer}>
        <View style={styles.valuesRow}>
          <Text style={styles.creditsValue}>0</Text>
          <Text style={styles.creditsLabel}>
            {translation.earningsCreditsLabel}
          </Text>
        </View>
        <Badge
          label={translation.earningsAedValueLabel}
          radius="sm"
          backgroundColor="StatesOutline"
          textColor="PrimaryMain"
          typographyToken="bodySmall2Medium"
          testID="earnings-total-card-badge"
          accessibilityLabel="earnings-total-card-badge"
          fullWidth={false}
          paddingVertical="Spacing-sm"
          paddingHorizontal="Spacing-xl"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Number(radius.xs), // moderateScale(2)
    borderWidth: 1,
    borderColor: colors.StatesOutline, // '#EBEBEB'
    padding: spacing['Spacing-5xl'], // spacingScale(16)
    gap: spacing['Spacing-10xl'], // spacingScale(24)
    backgroundColor: colors.StatesWhite, // '#FFFFFF'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.bodySmall1SemiBold, // fontScale(14), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.PrimaryMain, // '#101610'
  },
  rateText: {
    ...typography.bodySmall2Regular, // fontScale(12), lineHeightScale(16), 'Inter-Regular'
    color: colors.PrimaryMain, // '#101610'
  },
  valuesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: spacing['Spacing-xl'], // spacingScale(8)
  },
  creditsValue: {
    ...typography.h7SemiBold, // fontScale(24), lineHeightScale(28), 'Inter-SemiBold'
    color: colors.PrimaryMain, // '#101610'
  },
  creditsLabel: {
    ...typography.bodySmall2Regular, // fontScale(12), lineHeightScale(16), 'Inter-Regular'
    color: colors.PrimaryMain, // '#101610'
  },
  secondaryContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: spacing['Spacing-4xl'], // spacingScale(14)
  },
});
