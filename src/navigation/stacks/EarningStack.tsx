import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EarningsScreen } from '@screens/earnings/EarningsScreen';
import { TransactionDetailsScreen } from '@screens/earnings/TransactionDetailsScreen';

import type { EarningStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<EarningStackParamList>();

export const EarningStackNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
      animationDuration: 230,
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Earnings"
      component={EarningsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TransactionDetailsScreen"
      component={TransactionDetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
