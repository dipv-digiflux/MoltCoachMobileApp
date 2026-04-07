import React, { type ReactElement } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BankIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import {
  borderWidth,
  colors,
  iconScale,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type {
  BankAccount,
  RedeemTransferAccountsProps,
} from './RedeemTransferAccounts.types';

const BankCard = ({
  account,
  isSelected,
  onPress,
}: {
  account: BankAccount;
  isSelected: boolean;
  onPress: () => void;
}): ReactElement => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, isSelected && styles.cardSelected]}
    >
      <View style={styles.iconContainer}>
        <BankIconSvg
          width={iconScale(20)}
          height={iconScale(20)}
          color={colors.TextPrimaryHover}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.bankName}>{account.name}</Text>
        <Text style={styles.accountNumber}>{account.number}</Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]}>
        {isSelected && <View style={styles.radioInner} />}
      </View>
    </Pressable>
  );
};

export const RedeemTransferAccounts = ({
  accounts,
  selectedId,
  onSelect,
  onManageAccounts,
}: RedeemTransferAccountsProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{translation.redeemTransferToLabel}</Text>
        <Pressable onPress={onManageAccounts}>
          <Text style={styles.link}>
            {translation.redeemManageAccountsLabel}
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {accounts.map(account => (
          <BankCard
            key={account.id}
            account={account}
            isSelected={account.id === selectedId}
            onPress={() => onSelect?.(account.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing['Spacing-5xl'],
    paddingHorizontal: spacing['Spacing-4xl'],
    gap: spacing['Spacing-5xl'],
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
  scrollContent: {
    gap: spacing['Spacing-3xl'],
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing['Spacing-5xl'],
    backgroundColor: colors.StatesWhite,
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderSubtleDefault,
    borderRadius: radius.xs,
    width: moderateScale(260),
    gap: spacing['Spacing-3xl'],
  },
  cardSelected: {
    borderColor: colors.PrimaryMain,
  },
  iconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    backgroundColor: colors.StatesFill1,
    borderRadius: radius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    gap: spacing['Spacing-m'],
  },
  bankName: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryHover,
  },
  accountNumber: {
    ...typography.bodySmall3Regular,
    color: colors.IconPrimaryDefault,
  },
  radio: {
    width: iconScale(20),
    height: iconScale(20),
    borderRadius: radius.full,
    borderWidth: borderWidth.hairline,
    borderColor: colors.IconPrimaryDefault,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.PrimaryMain,
    backgroundColor: colors.PrimaryMain,
  },
  radioInner: {
    width: iconScale(8),
    height: iconScale(8),
    borderRadius: radius.full,
    backgroundColor: colors.StatesWhite,
  },
});
