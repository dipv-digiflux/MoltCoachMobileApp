import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from '@/screens/profile/ProfileScreen';

import type { ProfileStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
      animationDuration: 230,
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="ProfileHome"
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);
