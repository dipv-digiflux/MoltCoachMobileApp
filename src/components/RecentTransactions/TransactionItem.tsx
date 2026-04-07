import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ArrowDownLeftSvg, ArrowUpRightSvg } from '@/assets/images';
import { colors, iconScale, radius, spacing, typography } from '@/theme';

import type { TransactionItemProps } from './RecentTransactions.types';

export const TransactionItem = ({
  type,
  title,
  date,
  amount,
  aedValue,
  isLast = false,
}: TransactionItemProps): ReactElement => {
  const isIncoming = type === 'incoming';

  return (
    <View style={[styles.container, isLast && styles.noBorder]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isIncoming
              ? colors.FeedbackSuccessSurface
              : '#FFE5E5',
          },
        ]}
      >
        {isIncoming ? (
          <ArrowDownLeftSvg
            width={iconScale(16)}
            height={iconScale(16)}
            color={colors.FeedbackSuccessText}
          />
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
        <Text
          style={[
            styles.amount,
            { color: isIncoming ? colors.MatrixMain : colors.PrimaryMain },
          ]}
        >
          {isIncoming ? `+ ${amount.toFixed(2)}` : `- ${amount}`}
        </Text>
        <Text style={styles.aedValue}>{aedValue} AED</Text>
      </View>
    </View>
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
