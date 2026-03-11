import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, moderateScale } from '@/theme';

import type { StatusDotProps } from '@/types/statusDot.types';

export const StatusDot = ({
  color = colors.MatrixMain,
  size = moderateScale(8),
  style,
}: StatusDotProps): ReactElement => {
  const radius = size / 2;

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {},
});
