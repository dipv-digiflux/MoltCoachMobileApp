import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

import { MacroItemCompProps as MacroItemProps } from './MacroItem.types';

export const MacroItem = ({
  label,
  current,
  target,
  status,
  statusColor,
  containerStyle,
}: MacroItemProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{current}</Text>
        <Text style={styles.target}>{`/${target}g`}</Text>
      </View>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    ...typography.bodySmall2Regular,
    color: colors.PrimarySecondary,
    textTransform: 'uppercase',
    marginBottom: spacing['Spacing-m'],
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    ...typography.b1Bold,
    color: colors.PrimaryMain,
    marginRight: spacing['Spacing-xs'],
  },
  target: {
    ...typography.bodySmall2Regular,
    color: colors.PrimarySecondary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xs'],
    marginTop: spacing['Spacing-xs'],
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing['Spacing-m'],
  },
  statusText: {
    ...typography.bodySmall2Medium,
    color: colors.PrimarySecondary,
  },
});
