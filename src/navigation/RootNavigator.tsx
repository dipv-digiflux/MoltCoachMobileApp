import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import { OnboardingNavigator } from './OnboardingNavigator';
import { AppNavigator } from './AppNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator
 *
 * Root stack is responsible ONLY for routing between
 * OnboardingStack and AppStack, per navigation rules.
 *
 * No business logic or API calls should live here.
 * The initial route can later be driven by external state.
 */
export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OnboardingStack"
    >
      <Stack.Screen name="OnboardingStack" component={OnboardingNavigator} />
      <Stack.Screen name="AppStack" component={AppNavigator} />
    </Stack.Navigator>
  );
}
