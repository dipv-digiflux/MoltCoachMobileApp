import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileHomeScreen } from '@screens/profile/ProfileHomeScreen';

import type { ProfileStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export const ProfileStackNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      animation: 'slide_from_right',
    }}
  >
    <Stack.Screen
      name="ProfileHome"
      component={ProfileHomeScreen}
      options={{ title: 'Profile' }}
    />
  </Stack.Navigator>
);
