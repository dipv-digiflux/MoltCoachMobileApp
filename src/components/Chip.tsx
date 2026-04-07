import React, { ReactElement } from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { ChipProps } from './Chip.types';

export const Chip = ({
  label,
  containerStyle,
  textStyle,
}: ChipProps): ReactElement => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesFill1,
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: moderateScale(2),
    borderRadius: moderateScale(2),
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.bodySmall3Medium,
    color: colors.PrimarySecondary,
  },
});
