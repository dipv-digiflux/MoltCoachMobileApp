import React, { type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

import type { EarningsActionItemProps } from './EarningsOverview.types';

export const EarningsActionItem = ({
  label,
  icon,
  onPress,
  testID,
}: EarningsActionItemProps): ReactElement => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        testID={testID}
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      >
        {icon}
      </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  button: {
    width: '100%',
    aspectRatio: 1.5,
    backgroundColor: colors.StatesFill1,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: colors.StatesFill2,
  },
  label: {
    ...typography.bodySmall1SemiBold,
    color: colors.PrimaryMain,
    textAlign: 'center',
  },
});
