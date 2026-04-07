import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { borderWidth, colors, radius, spacing, typography } from '@/theme';

import type { RedeemSummaryCardProps } from './RedeemSummaryCard.types';

export const RedeemSummaryCard = ({
  conversionRateText,
  transferFeeText,
  receiveAmount,
}: RedeemSummaryCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>
          {translation.redeemSummaryConversionRateLabel}
        </Text>
        <Text style={styles.value}>{conversionRateText}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>
          {translation.redeemSummaryTransferFeeLabel}
        </Text>
        <Text style={styles.value}>{transferFeeText}</Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>
          {translation.redeemSummaryYouWillReceiveLabel}
        </Text>
        <Text style={styles.totalValue}>{receiveAmount.toFixed(2)} AED</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing['Spacing-5xl'],
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    gap: spacing['Spacing-3xl'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.bodySmall1Regular,
    color: colors.TextLabelDefault,
  },
  value: {
    ...typography.bodySmall1Regular,
    color: colors.TextLabelDefault,
  },
  divider: {
    height: borderWidth.hairline,
    backgroundColor: colors.BorderSubtleDefault,
    marginVertical: spacing['Spacing-m'],
  },
  totalRow: {
    marginTop: spacing['Spacing-m'],
  },
  totalLabel: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryHover,
  },
  totalValue: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryHover,
  },
});
