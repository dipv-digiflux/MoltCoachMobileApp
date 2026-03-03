import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GettingThingsReadyScreen } from '@/screens/loading/GettingThingsReadyScreen';
import { RequestAccessScreen } from '@/screens/profile/RequestAccessScreen';
import { ApplicationNotApprovedScreen } from '@screens/onboarding/ApplicationNotApprovedScreen';
import { OTPVerificationScreen } from '@screens/onboarding/OTPVerificationScreen';
import { PlanPreviewScreen } from '@screens/onboarding/PlanPreviewScreen';

import type { OnboardingStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationDuration: 230,
    }}
    initialRouteName="ApplicationNotApproved"
  >
    <Stack.Screen
      name="GettingThingsReady"
      component={GettingThingsReadyScreen}
    />
    <Stack.Screen
      name="OTPVerification"
      component={OTPVerificationScreen}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="PlanPreview" component={PlanPreviewScreen} />
    <Stack.Screen name="RequestAccessScreen" component={RequestAccessScreen} />
    <Stack.Screen
      name="ApplicationNotApproved"
      component={ApplicationNotApprovedScreen}
    />
  </Stack.Navigator>
);
