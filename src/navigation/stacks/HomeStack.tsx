import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeDashboardScreen } from '@screens/home/HomeDashboardScreen';
import { TaskCompletionScreen } from '@screens/home/TaskCompletionScreen';
import { TaskDetailsScreen } from '@screens/home/TaskDetailsScreen';
import { TaskProgressScreen } from '@screens/home/TaskProgressScreen';
import { ExampleFormScreen } from '@utils/form.example';

import type { HomeStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStackNavigator = (): ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeDashboard"
      component={HomeDashboardScreen}
      options={{ title: 'Home' }}
    />
    <Stack.Screen
      name="ExampleForm"
      component={ExampleFormScreen}
      options={{ title: 'Example Form' }}
    />
    <Stack.Screen
      name="TaskDetails"
      component={TaskDetailsScreen}
      options={{ title: 'Task Details' }}
    />
    <Stack.Screen
      name="TaskProgress"
      component={TaskProgressScreen}
      options={{ title: 'Task Progress' }}
    />
    <Stack.Screen
      name="TaskCompletion"
      component={TaskCompletionScreen}
      options={{ title: 'Task Completion' }}
    />
  </Stack.Navigator>
);
