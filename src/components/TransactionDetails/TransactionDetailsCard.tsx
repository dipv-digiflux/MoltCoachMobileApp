import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { UserSvg } from '@/assets/images';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  iconScale,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import type {
  TransactionDetailsCardProps,
  TransactionDetailsDetailRowProps,
} from './TransactionDetails.types';

const DetailRow = ({
  label,
  value,
  icon,
}: TransactionDetailsDetailRowProps): ReactElement => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.valueContainer}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={styles.value}>{value}</Text>
    </View>
  </View>
);

export const TransactionDetailsCard = ({
  transactionType,
  from,
  dateTime,
  note,
}: TransactionDetailsCardProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{'Details'}</Text>
        <DetailRow
          label={translation.transactionDetailsLabelType}
          value={transactionType}
        />
        <View style={styles.divider} />
        <DetailRow
          label={translation.transactionDetailsLabelFrom}
          value={from}
          icon={
            <View style={styles.iconWrapper}>
              <UserSvg
                width={iconScale(14)}
                height={iconScale(14)}
                color={colors.TextPrimaryHover}
              />
            </View>
          }
        />
        <View style={styles.divider} />
        <DetailRow
          label={translation.transactionDetailsLabelDateTime}
          value={dateTime}
        />
        {note && (
          <>
            <View style={styles.divider} />
            <View style={styles.noteSection}>
              <Text style={styles.noteLabel}>
                {translation.transactionDetailsLabelNote}
              </Text>
              <Text style={styles.noteValue}>{note}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...typography.h10Bold,
    color: colors.TextPrimaryHover,
    paddingBottom: spacing['Spacing-5xl'],
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderCardDefault,
    borderRadius: radius.xs,
    padding: spacing['Spacing-7xl'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing['Spacing-5xl'],
  },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDefault,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconWrapper: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: radius.full,
    backgroundColor: colors.StatesFill1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.bodySmall1Bold,
    color: colors.TextPrimaryHover,
  },
  divider: {
    height: 1,
    backgroundColor: colors.BorderCardDefault,
    marginBottom: spacing['Spacing-5xl'],
  },
  noteSection: {
    paddingTop: spacing['Spacing-xl'],
    gap: spacing['Spacing-xl'],
  },
  noteLabel: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  noteValue: {
    ...typography.bodySmall1TallMedium,
    color: colors.TextPrimaryHover,
  },
});
