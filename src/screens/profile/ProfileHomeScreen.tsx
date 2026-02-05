import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ProfileHomeScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Home</Text>
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
