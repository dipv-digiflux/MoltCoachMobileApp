import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, lineHeightScale, spacing, typography } from '@/theme';

import type { ApplicationNotApprovedMessageProps } from '@/types/components.types';

export const ApplicationNotApprovedMessage = ({
  title,
  description,
}: ApplicationNotApprovedMessageProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-xl'], // 8px
    textAlign: 'center',
    paddingHorizontal: spacing['Spacing-3xl'], // 12px
  },
  title: {
    ...typography.h7Bold,
    lineHeight: lineHeightScale(24), // 100% of 24px
    textAlign: 'center',
    color: colors.TextPrimaryDefault,
  },
  description: {
    ...typography.bodySmall1Regular,
    textAlign: 'center',
    color: colors.TextSecondaryDefault,
  },
});
