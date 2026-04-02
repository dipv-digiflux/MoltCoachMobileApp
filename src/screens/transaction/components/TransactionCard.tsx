import React, { type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

import { TransactionCardProps } from './TransactionCard.types';

export const TransactionCard = ({
  title,
  amount,
  date,
  type,
  onPress,
}: TransactionCardProps): ReactElement => {
  const isCredit = type === 'credit';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.amount, isCredit && styles.creditAmount]}>
            {isCredit ? `+ ${amount}` : `- ${amount}`}
          </Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
    borderRadius: radius.md,
    padding: spacing['Spacing-xl'],
    marginBottom: spacing['Spacing-xl'],
  },
  content: {
    gap: spacing['Spacing-xs'],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  amount: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  creditAmount: {
    color: colors.FeedbackSuccessText,
  },
  date: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
});
