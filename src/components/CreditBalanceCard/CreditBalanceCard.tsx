import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CreditIconSvg, RightIndicationArrowSvg } from '@/assets/images';
import { colors, iconScale, spacing, typography, radius } from '@/theme';

import { CreditBalanceCardProps } from './CreditBalanceCard.types';

export const CreditBalanceCard = ({
  balance,
  label = 'Molt Credit',
  onPress,
  style,
}: CreditBalanceCardProps): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${balance}`}
    >
      <View style={styles.leftSection}>
        <CreditIconSvg width={iconScale(24)} height={iconScale(24)} />
        <Text style={styles.balanceText}>{balance}</Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.labelText}>{label}</Text>
        <RightIndicationArrowSvg
          width={iconScale(18)}
          height={iconScale(18)}
          color={colors.IconSecondaryDefault}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    padding: spacing['Spacing-3xl'],
  },
  pressed: {
    backgroundColor: colors.StatesFill1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  balanceText: {
    ...typography.bodySmall1TallSemiBold,
    color: colors.TextPrimaryDefault,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-m'],
  },
  labelText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
});
