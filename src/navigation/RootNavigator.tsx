import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppNavigator } from '@navigation/AppNavigator';
import { OnboardingNavigator } from '@navigation/OnboardingNavigator';

import type { RootStackParamList } from '@navigation/types';

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
export const RootNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
    initialRouteName="OnboardingStack"
  >
    <Stack.Screen name="OnboardingStack" component={OnboardingNavigator} />
    <Stack.Screen name="AppStack" component={AppNavigator} />
  </Stack.Navigator>
);
