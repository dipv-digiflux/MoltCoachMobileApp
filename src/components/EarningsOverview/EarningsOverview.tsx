import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  PaperPlaneIconSvg,
  ShopIconSvg,
  WithdrawIconSvg,
} from '@/assets/images';
import { Badge } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import { EarningsActionItem } from './EarningsActionItem';

import type { EarningsOverviewProps } from './EarningsOverview.types';

export const EarningsOverview = ({
  credits = 0,
  aedValue = 0,
  onRedeem,
  onWithdraw,
  onTransferToClient,
  style,
}: EarningsOverviewProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={[styles.container, style]}>
      {/* Header Card */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>
            {translation.earningsTotalEarningsTitle}
          </Text>
          <Text style={styles.rateText}>{translation.earningsCreditRate}</Text>
        </View>

        <View style={styles.earningsInfo}>
          <View style={styles.creditsRow}>
            <Text style={styles.creditsValue}>{credits}</Text>
            <Text style={styles.creditsLabel}>
              {translation.earningsCreditsLabel}
            </Text>
          </View>

          <Badge
            label={`= ${aedValue.toFixed(2)} AED`}
            backgroundColor="StatesFill1"
            textColor="TextPrimaryDefault"
            typographyToken="bodySmall1SemiBold"
            paddingHorizontal="Spacing-xl"
            paddingVertical="Spacing-m"
            radius="xs"
            style={styles.badge}
          />
        </View>
      </View>

      {/* Action Grid */}
      <View style={styles.actionGrid}>
        <EarningsActionItem
          label={translation.earningsRedeemLabel}
          icon={
            <ShopIconSvg
              width={iconScale(24)}
              height={iconScale(24)}
              color={colors.IconPrimaryDefault}
            />
          }
          onPress={onRedeem}
          testID="earnings-redeem-button"
        />
        <EarningsActionItem
          label={translation.earningsWithdrawLabel}
          icon={
            <WithdrawIconSvg
              width={iconScale(24)}
              height={iconScale(24)}
              color={colors.IconPrimaryDefault}
            />
          }
          onPress={onWithdraw}
          testID="earnings-withdraw-button"
        />
        <EarningsActionItem
          label={translation.earningsTransferToClientLabel}
          icon={
            <PaperPlaneIconSvg
              width={iconScale(24)}
              height={iconScale(24)}
              color={colors.IconPrimaryDefault}
            />
          }
          onPress={onTransferToClient}
          testID="earnings-transfer-button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-10xl'],
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-5xl'],
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  rateText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  earningsInfo: {
    gap: spacing['Spacing-xl'],
    alignItems: 'flex-start',
  },
  creditsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing['Spacing-xl'],
  },
  creditsValue: {
    ...typography.h7SemiBold,
    color: colors.PrimaryMain,
  },
  creditsLabel: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: spacing['Spacing-5xl'],
  },
});
