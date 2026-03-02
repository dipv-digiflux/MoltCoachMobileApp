import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppSelector } from '@/store/hooks';
import { colors, spacing, typography } from '@/theme';

import { LoadingRing } from './LoadingRing';

/**
 * Centered loading + text block used for "Getting things ready" flows.
 *
 * Layout spec:
 * - Vertical stack: loader, then text container
 * - Gap between loader and text container: ~19px
 * - Gap between main and sub text: 8px
 *
 * Typography:
 * - Main text: Inter 600, 24/28, centered
 * - Sub text: Inter 400, 14/16, centered
 */
export const GettingThingsReady = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <LoadingRing />

      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          {translation.gettingThingsReadyMainText}
        </Text>
        <Text style={styles.subText}>
          {translation.gettingThingsReadySubText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-7xl'], // ≈19–20px between loader and text block
  },
  textContainer: {
    alignItems: 'center',
    gap: spacing['Spacing-xl'], // 8px between main and sub text
  },
  mainText: {
    ...typography.h7SemiBold, // 24px font size, 28px line height
    textAlign: 'center',
    color: colors.PrimaryMain,
  },
  subText: {
    ...typography.bodySmall1Regular, // 14px font size, 16px line height
    textAlign: 'center',
    color: colors.TextSecondaryDefault,
  },
});
