import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { colors, radius, spacing, typography } from '@/theme';

import type { ReferAndEarnCardProps } from './ReferAndEarnCard.types';

export const ReferAndEarnCard = ({
  onPress,
  style,
}: ReferAndEarnCardProps): React.ReactElement => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Refer & Earn</Text>
      <Text style={styles.description}>
        Refer a coach or client to Molt and earn rewards when they join.
      </Text>
      <Button
        label="Refer now"
        variant="secondary"
        iconRight="arrow-right"
        onPress={onPress}
        fullWidth
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryMain,
    padding: spacing['Spacing-8xl'],
    borderRadius: radius.xs,
    alignSelf: 'stretch',
  },
  title: {
    ...typography.h7Bold,
    color: colors.StatesWhite,
    marginBottom: spacing['Spacing-m'],
  },
  description: {
    ...typography.bodySmall1TallRegular,
    color: colors.StatesWhite,
    marginBottom: spacing['Spacing-8xl'],
    opacity: 0.9,
  },
  button: {
    marginTop: spacing['Spacing-m'],
  },
});
