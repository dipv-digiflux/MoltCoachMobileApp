import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ShopStackParamList } from '../types';
import { MealsHomeScreen } from '../../screens/shop/MealsHomeScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

export function ShopStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MealsHome"
        component={MealsHomeScreen}
        options={{ title: 'Meals' }}
      />
    </Stack.Navigator>
  );
}
