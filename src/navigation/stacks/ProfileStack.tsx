import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../types';
import { ProfileHomeScreen } from '../../screens/profile/ProfileHomeScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
}
