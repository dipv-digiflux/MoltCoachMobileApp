import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';

import { StatusDot } from './StatusDot';
import { StatusMessageProps } from './StatusMessage.types';

export const StatusMessage = ({
  status,
  message,
  color = colors.MatrixMain,
  containerStyle,
}: StatusMessageProps): ReactElement => {
  // Check if message already starts with status + " : " to avoid duplication
  const displayMessage = message.startsWith(`${status} : `)
    ? message.substring(status.length + 3)
    : message;

  return (
    <View style={[styles.statusMessageRow, containerStyle]}>
      <StatusDot color={color} size={moderateScale(8)} />
      <Text style={styles.statusMessage}>
        <Text style={styles.statusLabel}>{status}</Text>
        {' : '}
        <Text style={styles.statusMessageSub}>{displayMessage}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.StatesFill1,
    padding: spacing['Spacing-m'],
    borderRadius: moderateScale(4),
    gap: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-xl'],
  },
  statusMessage: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  statusLabel: {
    ...typography.bodySmall2Medium,
  },
  statusMessageSub: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
});
