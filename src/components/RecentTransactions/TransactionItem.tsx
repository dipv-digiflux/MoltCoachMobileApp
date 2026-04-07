import React, { type ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import {
  ArrowDownLeftSvg,
  ArrowUpRightSvg,
  TransferRequestSvg,
} from '@/assets/images';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import type { TransactionItemProps } from './RecentTransactions.types';

export const TransactionItem = ({
  type,
  title,
  date,
  amount,
  aedValue,
  isLast = false,
  onPress,
}: TransactionItemProps): ReactElement => {
  const isIncoming = type === 'incoming';
  const isOutgoing = type === 'outgoing';
  const isTransfer = type === 'transfer';

  const iconBgColor = isIncoming
    ? colors.FeedbackSuccessSurface
    : isTransfer
    ? colors.StatesFill1
    : colors.FeedbackWarningSurface;

  const amountColor = isIncoming
    ? colors.MatrixMain
    : isTransfer
    ? colors.PrimarySecondary
    : colors.PrimaryMain;

  const amountPrefix = isIncoming ? '+ ' : isTransfer ? '' : '- ';

  return (
    <TouchableOpacity
      style={[styles.container, isLast && styles.noBorder]}
      onPress={() => onPress?.({ type, title, date, amount, aedValue, isLast })}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
        {isIncoming ? (
          <ArrowDownLeftSvg
            width={iconScale(16)}
            height={iconScale(16)}
            color={colors.FeedbackSuccessText}
          />
        ) : isTransfer ? (
          <TransferRequestSvg width={iconScale(22)} height={iconScale(15)} />
        ) : (
          <ArrowUpRightSvg
            width={iconScale(16)}
            height={iconScale(16)}
            color={colors.FeedbackWarningText}
          />
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {amountPrefix}
          {isTransfer
            ? amount.toFixed(2)
            : isOutgoing
            ? amount
            : amount.toFixed(2)}
        </Text>
        <Text style={styles.aedValue}>{aedValue} AED</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-xl'],
    borderBottomWidth: 1,
    borderBottomColor: colors.StatesOutline,
    gap: spacing['Spacing-xl'],
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: iconScale(40),
    height: iconScale(40),
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: spacing['Spacing-xl'],
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },
  date: {
    ...typography.bodySmall1Regular,
    color: colors.PrimarySecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
    gap: spacing['Spacing-xl'],
  },
  amount: {
    ...typography.bodySmall1Bold,
  },
  aedValue: {
    ...typography.bodySmall2Regular,
    color: colors.PrimarySecondary,
  },
});
