import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { borderWidth, colors, radius, spacing, typography } from '@/theme';

import type {
  TransactionDetailsDetailRowProps,
  TransactionInfoCardProps,
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

export const TransactionInfoCard = ({
  title,
  rows,
  headerBadge,
  footerNote,
}: TransactionInfoCardProps): ReactElement => {
  const hasHeader = title !== undefined || headerBadge !== undefined;

  return (
    <View style={styles.container}>
      {hasHeader && (
        <View style={styles.headerContainer}>
          {title !== undefined && <Text style={styles.title}>{title}</Text>}
          {headerBadge}
        </View>
      )}
      <View style={styles.card}>
        {rows.map((row, index) => (
          <React.Fragment key={`${row.label}-${index}`}>
            <DetailRow {...row} />
            {index < rows.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
        {footerNote && (
          <View style={styles.footerContainer}>
            <Text style={styles.footerNote}>{footerNote}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing['Spacing-10xl'],
  },
  title: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryStrong,
  },
  card: {
    backgroundColor: colors.StatesWhite,
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderSubtleDefault,
    borderRadius: radius.xs,
    padding: spacing['Spacing-5xl'],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing['Spacing-xl'],
  },
  label: {
    ...typography.bodySmall4Regular,
    color: colors.IconTertiarySubtle,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  iconWrapper: {
    marginRight: spacing['Spacing-xs'],
  },
  value: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryStrong,
  },
  divider: {
    height: 1,
    backgroundColor: colors.BorderDividerSubtle,
  },
  footerContainer: {
    marginTop: spacing['Spacing-7xl'],
    paddingTop: spacing['Spacing-7xl'],
    borderTopWidth: borderWidth.hairline,
    borderTopColor: colors.BorderCardDefault,
  },
  footerNote: {
    ...typography.bodySmall4TallRegular,
    color: colors.TextSecondaryDefault,
  },
});
