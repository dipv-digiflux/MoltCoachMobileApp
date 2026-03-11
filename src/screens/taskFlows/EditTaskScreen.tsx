import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { spacing, typography } from '@/theme';

import type { AppStackNavigationProp } from '@navigation/types';

export const EditTaskScreen = (): ReactElement => {
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Task</Text>
      <Button
        title="Next: Summary"
        onPress={() => navigation.navigate('TaskSummary')}
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
    ...typography.h3Bold,
    marginBottom: spacing['Spacing-5xl'],
  },
});
