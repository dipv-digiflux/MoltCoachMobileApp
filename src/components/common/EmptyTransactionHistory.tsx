import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CreditIconSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale, spacing, typography } from '@/theme';

export const EmptyTransactionHistory = (): ReactElement => {
  const translations = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <CreditIconSvg
        width={iconScale(48)}
        height={iconScale(48)}
        color={colors.IconSecondaryDefault}
      />
      <Text style={styles.title}>
        {translations.transactionHistoryEmptyTitle}
      </Text>
      <Text style={styles.subtitle}>
        {translations.transactionHistoryEmptySubtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-3xl'],
    backgroundColor: colors.StatesWhite,
    paddingHorizontal: spacing['Spacing-10xl'],
  },
  title: {
    ...typography.h10SemiBold,
    color: colors.PrimaryMain,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
  },
});
