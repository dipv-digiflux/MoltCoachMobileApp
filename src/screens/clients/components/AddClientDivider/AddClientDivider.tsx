import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

import type { AddClientDividerProps } from './AddClientDivider.types';

const DividerBorder = (): ReactElement => {
  return <View style={styles.border} />;
};

export const AddClientDivider = ({
  label,
}: AddClientDividerProps): ReactElement => {
  return (
    <View style={styles.container}>
      <DividerBorder />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{label}</Text>
      </View>
      <DividerBorder />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout so borders sit on either side of the label
    alignItems: 'center', // Vertically center the label with the divider lines
  },
  border: {
    flex: 1, // Each side line should flex to fill remaining horizontal space
    borderBottomWidth: 1, // 1px bottom border as per design
    borderBottomColor: colors.DividerSubtleOverlay, // #00000014 from theme for subtle divider
  },
  textContainer: {
    paddingLeft: spacing['Spacing-3xl'], // Horizontal padding left (12px token) around label
    paddingRight: spacing['Spacing-3xl'], // Horizontal padding right (12px token) around label
  },
  text: {
    ...typography.bodySmall2SemiBold, // 12px Inter SemiBold, matches spec for small strong label
    letterSpacing: 0.6, // Slight tracking to match design letter-spacing
    textAlign: 'center', // Center-align text within the chip
    color: colors.IconTertiarySubtle,
  },
});
