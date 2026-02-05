import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { AppStackNavigationProp } from '../../navigation/types';

export const TaskSuccessScreen = (): ReactElement => {
  const navigation = useNavigation<AppStackNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Success</Text>
      <Button
        title="Back to Home Dashboard"
        onPress={() =>
          navigation.navigate('BottomTabs', {
            screen: 'HomeTab',
            params: { screen: 'HomeDashboard' },
          })
        }
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
