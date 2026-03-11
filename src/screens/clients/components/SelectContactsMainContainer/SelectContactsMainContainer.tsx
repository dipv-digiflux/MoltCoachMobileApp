import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import type { SelectContactsMainContainerProps } from './SelectContactsMainContainer.types';

export const SelectContactsMainContainer = ({
  children,
}: SelectContactsMainContainerProps): ReactElement => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.xs,
    borderWidth: 1,
    padding: spacing['Spacing-5xl'], // 16px
    gap: spacing['Spacing-5xl'],
    backgroundColor: colors.StatesWhite,
    borderColor: colors.DividerSubtleOverlay,
    marginHorizontal: spacing['Spacing-5xl'],
  },
});
