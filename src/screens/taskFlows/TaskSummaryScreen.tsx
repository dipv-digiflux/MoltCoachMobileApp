import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { AppStackNavigationProp } from '@navigation/types';

export const TaskSummaryScreen = (): ReactElement => {
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Summary</Text>
      <Button
        title="Complete Task"
        onPress={() => navigation.navigate('TaskSuccess')}
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
