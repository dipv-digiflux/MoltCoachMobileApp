import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { spacing } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

export const QRScanScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>QR Scan</Text>
      <Button
        title="Plan Preview"
        onPress={() => navigation.navigate('PlanPreview')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: spacing['Spacing-5xl'],
  },
});
