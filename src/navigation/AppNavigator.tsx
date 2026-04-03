import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomTabs } from '@navigation/BottomTabs';
import { AddClientScreen } from '@screens/clients/AddClientScreen';
import { AddedClientsScreen } from '@screens/clients/AddedClientsScreen';
import { ClientDetailScreen } from '@screens/clients/ClientDetailScreen';
import { GeneratingPlanScreen } from '@screens/clients/GeneratingPlanScreen';
import { InviteSentScreen } from '@screens/clients/InviteSentScreen';
import { ManageTasksScreen } from '@screens/clients/ManageTasksScreen';
import { NudgeSentScreen } from '@screens/clients/NudgeSentScreen';
import { SelectContactScreen } from '@screens/clients/SelectContactScreen';
import { SendNudgeScreen } from '@screens/clients/SendNudgeScreen';
import { SuggestedPlanScreen } from '@screens/clients/SuggestedPlanScreen';
import { EarningsScreen } from '@screens/earnings/EarningsScreen';
import { ImportContactsScreen } from '@screens/onboarding/ImportContactsScreen';
import { ProfileScreen } from '@screens/profile';
import { ContactUsScreen } from '@screens/profile/ContactUsScreen';
import { PaymentMethodsScreen } from '@screens/profile/PaymentMethodsScreen';
import { ProfileSettingsScreen } from '@screens/profile/ProfileSettingsScreen';
import { ReferCoachScreen } from '@screens/profile/ReferCoachScreen';
import {
  CreateTaskScreen,
  EditTaskScreen,
  TaskTypeSelectionScreen,
  FrequencySetupScreen,
  ReminderSetupScreen,
  TaskSummaryScreen,
  TaskSuccessScreen,
} from '@screens/taskFlows';
import { TransactionDetailsScreen } from '@screens/transaction/TransactionDetailsScreen';
import { TransactionHistoryScreen } from '@screens/transaction/TransactionHistoryScreen';

import type { AppStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationDuration: 230,
    }}
    initialRouteName="profile"
  >
    <Stack.Screen name="BottomTabs" component={BottomTabs} />

    <Stack.Screen name="Earnings" component={EarningsScreen} />
    <Stack.Screen name="AddClient" component={AddClientScreen} />
    <Stack.Screen name="AddedClients" component={AddedClientsScreen} />
    <Stack.Screen name="ImportContacts" component={ImportContactsScreen} />
    <Stack.Screen name="SelectContact" component={SelectContactScreen} />
    <Stack.Screen name="InviteSent" component={InviteSentScreen} />
    <Stack.Screen name="GeneratingPlan" component={GeneratingPlanScreen} />
    <Stack.Screen name="SuggestedPlan" component={SuggestedPlanScreen} />
    <Stack.Screen name="profile" component={ProfileScreen} />
    <Stack.Screen name="ClientDetail" component={ClientDetailScreen} />
    <Stack.Screen name="ManageTasks" component={ManageTasksScreen} />
    <Stack.Screen name="SendNudge" component={SendNudgeScreen} />
    <Stack.Screen name="NudgeSent" component={NudgeSentScreen} />

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

    <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
    <Stack.Screen name="ContactUs" component={ContactUsScreen} />
    <Stack.Screen name="ReferCoach" component={ReferCoachScreen} />
    <Stack.Screen
      name="TransactionHistory"
      component={TransactionHistoryScreen}
    />
    <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
    <Stack.Screen
      name="TransactionDetails"
      component={TransactionDetailsScreen}
    />
  </Stack.Navigator>
);
