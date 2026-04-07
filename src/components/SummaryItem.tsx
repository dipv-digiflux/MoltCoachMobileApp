import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, typography } from '@/theme';

import { SummaryItemProps } from './SummaryItem.types';

export const SummaryItem = ({
  value,
  label,
  containerStyle,
  valueStyle,
  labelStyle,
}: SummaryItemProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.value, valueStyle]}>{value}</Text>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  label: {
    ...typography.bodySmall3Regular,
    color: colors.TextSecondaryDefault,
  },
});
