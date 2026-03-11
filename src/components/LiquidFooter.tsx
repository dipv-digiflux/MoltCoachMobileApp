import React, { type ReactElement } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

import type { LiquidFooterProps } from '@/types/components.types';

export const LiquidFooter = ({
  children,
  showTopBorder = false,
  fallbackBackgroundColor,
  style,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}: LiquidFooterProps): ReactElement => {
  const insets = useSafeAreaInsets();

  const baseToken = padding ?? 'Spacing-5xl';
  const baseHorizontalToken = paddingHorizontal ?? baseToken;
  const baseVerticalToken = paddingVertical ?? baseToken;

  const topToken = paddingTop ?? baseVerticalToken;
  const bottomToken = paddingBottom ?? baseVerticalToken;
  const leftToken = paddingLeft ?? baseHorizontalToken;
  const rightToken = paddingRight ?? baseHorizontalToken;

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      paddingTop: spacing[topToken],
      paddingBottom: insets.bottom + spacing[bottomToken],
      paddingLeft: spacing[leftToken],
      paddingRight: spacing[rightToken],
    },
    showTopBorder ? styles.topBorder : null,
    !isLiquidGlassSupported
      ? {
          backgroundColor: fallbackBackgroundColor ?? colors.OverlayLight,
        }
      : null,
    style,
  ];

  return <LiquidGlassView style={containerStyle}>{children}</LiquidGlassView>;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  topBorder: {
    borderTopWidth: 1,
    borderTopColor: colors.BorderPrimaryDisabled,
  },
});
