import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabs } from '@navigation/BottomTabs';
import {
  CreateTaskScreen,
  EditTaskScreen,
  TaskTypeSelectionScreen,
  FrequencySetupScreen,
  ReminderSetupScreen,
  TaskSummaryScreen,
  TaskSuccessScreen,
} from '@screens/taskFlows';

import type { AppStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="BottomTabs" component={BottomTabs} />

    {/* Task ActionFlows (tabs hidden) */}
    <Stack.Screen name="CreateTask" component={CreateTaskScreen} />
    <Stack.Screen name="EditTask" component={EditTaskScreen} />
    <Stack.Screen
      name="TaskTypeSelection"
      component={TaskTypeSelectionScreen}
    />
    <Stack.Screen name="FrequencySetup" component={FrequencySetupScreen} />
    <Stack.Screen name="ReminderSetup" component={ReminderSetupScreen} />
    <Stack.Screen name="TaskSummary" component={TaskSummaryScreen} />
    <Stack.Screen
      name="TaskSuccess"
      component={TaskSuccessScreen}
      options={{
        gestureEnabled: false,
      }}
    />
  </Stack.Navigator>
);
