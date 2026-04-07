import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';

import { type EmptyStateProps } from './EmptyState.types';

export const EmptyState = ({
  icon,
  title,
  description,
  buttonLabel,
  onButtonPress,
}: EmptyStateProps): React.ReactElement => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {buttonLabel && (
        <Button
          label={buttonLabel}
          onPress={onButtonPress}
          variant="primary"
          iconRight="plus"
          size="small"
          style={styles.button}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-10xl'],
    flexDirection: 'column',
  },
  iconWrapper: {
    marginBottom: spacing['Spacing-xl'],
  },
  title: {
    ...typography.h10SemiBold,
    color: colors.TextPrimaryDefault,
    textAlign: 'center',
    marginBottom: spacing['Spacing-m'],
  },
  description: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
    textAlign: 'center',
    marginBottom: spacing['Spacing-8xl'],
  },
  button: {
    alignSelf: 'center',
  },
});
