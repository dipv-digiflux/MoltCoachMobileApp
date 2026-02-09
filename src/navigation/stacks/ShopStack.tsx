import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MealsHomeScreen } from '@screens/shop/MealsHomeScreen';

import type { ShopStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export const ShopStackNavigator = (): ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="MealsHome"
      component={MealsHomeScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
