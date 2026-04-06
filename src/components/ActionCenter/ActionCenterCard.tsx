import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { colors, moderateScale, spacing, typography } from '@/theme';

import { ActionCenterCardProps } from './ActionCenter.types';

export const ActionCenterCard = ({
  action,
}: ActionCenterCardProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={1}>
        {action.title}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {action.description}
      </Text>
      <View style={styles.buttonRow}>
        <Button
          label="Reject"
          variant="outline"
          onPress={action.onReject}
          style={styles.button}
          size="small"
        />
        <Button
          label="Accept"
          variant="primary"
          onPress={action.onAccept}
          style={styles.button}
          size="small"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(240),
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-3xl'],
    // marginRight: spacing['Spacing-xl'],
    gap: spacing['Spacing-m'],
  },
  title: {
    ...typography.bodySmall1TallSemiBold,
    color: colors.TextPrimaryDefault,
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-3xl'],
    height: moderateScale(40),
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
  },
  button: {
    flex: 1,
    height: moderateScale(36),
  },
});
