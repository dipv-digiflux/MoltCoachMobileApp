import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';

import type { OnboardingNavigationProp } from '@navigation/types';

export const PlanPreviewScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan Preview</Text>
      <Button
        title="Continue to App"
        onPress={() => {
          const root = navigation.getParent();
          root?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'AppStack',
                  params: {
                    screen: 'BottomTabs',
                    params: {
                      screen: 'HomeTab',
                      params: { screen: 'HomeDashboard' },
                    },
                  },
                },
              ],
            }),
          );
        }}
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
