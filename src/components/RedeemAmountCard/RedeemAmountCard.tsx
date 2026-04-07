import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ShieldTickCustomSvg } from '@/assets/images';
import { Badge } from '@/components';
import { useAppSelector } from '@/store/hooks';
import {
  borderWidth,
  colors,
  iconScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type { RedeemAmountCardProps } from './RedeemAmountCard.types';

export const RedeemAmountCard = ({
  credits,
  aedValue,
  tierLimitTotal,
  tierLimitApplied,
  tierPercentage: _tierPercentage,
  onWithdrawAll,
}: RedeemAmountCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.label}>{translation.redeemAmountLabel}</Text>
        <Pressable onPress={onWithdrawAll}>
          <Text style={styles.link}>{translation.redeemWithdrawAll}</Text>
        </Pressable>
      </View>

      {/* Amount Card */}
      <View style={styles.amountCard}>
        <Text style={styles.amountText}>{credits}</Text>
        <Badge
          label={`= ${aedValue.toFixed(2)} AED`}
          backgroundColor="StatesFill1"
          textColor="TextPrimaryHover"
          typographyToken="bodySmall1SemiBold"
          paddingHorizontal="Spacing-xl"
          paddingVertical="Spacing-m"
          radius="xs"
          style={styles.badge}
        />
      </View>

      {/* Tier Limit Banner */}
      <View style={styles.banner}>
        <ShieldTickCustomSvg
          width={iconScale(14)}
          height={iconScale(14)}
          color={colors.FeedbackSuccessText}
        />
        <Text style={styles.bannerText}>
          {translation.redeemTierLimitBanner
            .replace('{{limit}}', tierLimitTotal.toString())
            .replace('{{amount}}', tierLimitApplied.toString())}
        </Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.dot} />
        <Text style={styles.infoText}>{translation.redeemWithdrawInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['Spacing-5xl'],
    paddingHorizontal: spacing['Spacing-4xl'],
    gap: spacing['Spacing-10xl'],
    backgroundColor: colors.StatesWhite,
    borderRadius: radius.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryHover,
  },
  link: {
    ...typography.bodySmall1Regular,
    color: colors.PrimaryMain,
    borderBottomWidth: borderWidth.hairline,
    borderBottomColor: colors.TextPrimaryDisabled,
  },
  amountCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing['Spacing-5xl'],
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderSubtleDefault,
    borderRadius: radius.xs,
  },
  amountText: {
    ...typography.h0SemiBold,
    color: colors.TextPrimaryHover,
  },
  badge: {
    borderWidth: 0,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing['Spacing-2xl'],
    paddingVertical: spacing['Spacing-l'],
    backgroundColor: colors.FeedbackSuccessSurface,
    borderRadius: radius.xs,
    gap: spacing['Spacing-m'],
  },
  bannerText: {
    ...typography.bodySmall2Medium,
    color: colors.AccentTierLimitText,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing['Spacing-l'],
    paddingHorizontal: spacing['Spacing-2xl'],
    backgroundColor: colors.SurfacePrimaryDefault,
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderPrimaryDisabled,
    borderRadius: radius.xs,
    gap: spacing['Spacing-l'],
  },
  dot: {
    width: iconScale(8),
    height: iconScale(8),
    borderRadius: radius.full,
    backgroundColor: colors.MatrixMain,
    marginTop: spacing['Spacing-m'],
  },
  infoText: {
    ...typography.bodySmall2Medium,
    color: colors.PrimaryMain,
    flex: 1,
  },
});
