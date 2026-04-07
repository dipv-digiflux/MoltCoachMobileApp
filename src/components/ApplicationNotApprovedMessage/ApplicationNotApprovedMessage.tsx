import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme';

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
    gap: spacing['Spacing-xl'],
    textAlign: 'left',
  },
  title: {
    ...typography.h8SemiBold,
    color: colors.AccentDeepGreen,
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.NeutralTealGrayIcon,
  },
});
