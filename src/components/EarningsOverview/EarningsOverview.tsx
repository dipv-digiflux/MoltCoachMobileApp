import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  PaperPlaneIconSvg,
  ShopIconSvg,
  WithdrawIconSvg,
} from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, spacing } from '@/theme';

import { EarningsActionItem } from './EarningsActionItem';
import { EarningsHeaderCard } from './EarningsHeaderCard';

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
      <EarningsHeaderCard
        title={translation.earningsTotalEarningsTitle}
        rateText={translation.earningsCreditRate}
        credits={credits}
        creditsLabel={translation.earningsCreditsLabel}
        aedText={aedValue.toFixed(2)}
      />

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
  actionGrid: {
    flexDirection: 'row',
    gap: spacing['Spacing-5xl'],
  },
});
