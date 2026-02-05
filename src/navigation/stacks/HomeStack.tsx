import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../types';
import { HomeDashboardScreen } from '../../screens/home/HomeDashboardScreen';
import { TaskDetailsScreen } from '../../screens/home/TaskDetailsScreen';
import { TaskProgressScreen } from '../../screens/home/TaskProgressScreen';
import { TaskCompletionScreen } from '../../screens/home/TaskCompletionScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDashboard"
        component={HomeDashboardScreen}
        options={{ title: 'Home' }}
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
}
