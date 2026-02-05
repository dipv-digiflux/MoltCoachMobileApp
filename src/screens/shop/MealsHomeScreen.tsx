import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MealsHomeScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals Home</Text>
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
