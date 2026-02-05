import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { HomeStackNavigationProp } from '../../navigation/types';

export const TaskProgressScreen = (): ReactElement => {
  const navigation = useNavigation<HomeStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Progress</Text>
      <Button
        title="Go to Completion"
        onPress={() => navigation.navigate('TaskCompletion')}
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
