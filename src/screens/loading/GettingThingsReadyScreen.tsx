import React, { type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GettingThingsReady } from '@/components';
import { colors, spacing } from '@/theme';

export const GettingThingsReadyScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, spacing['Spacing-10xl']),
        },
      ]}
    >
      <GettingThingsReady />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-7xl'],
  },
});
