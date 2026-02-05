import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { OnboardingNavigationProp } from '@navigation/types';

export const IntroCarouselScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intro Carousel</Text>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('GetStarted')}
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
    marginBottom: 16,
  },
});
