import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MealsHomeScreen } from '@screens/shop/MealsHomeScreen';

import type { ShopStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export const ShopStackNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen
      name="MealsHome"
      component={MealsHomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
