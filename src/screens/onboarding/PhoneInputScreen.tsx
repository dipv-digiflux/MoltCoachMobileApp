import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { spacing } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

export const PhoneInputScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Input</Text>
      <Button
        title="Verify OTP"
        onPress={() => navigation.navigate('OTPVerification')}
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
