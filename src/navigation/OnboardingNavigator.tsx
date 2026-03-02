import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  >
    <Stack.Screen
      name="OTPVerification"
      component={OTPVerificationScreen}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="PlanPreview" component={PlanPreviewScreen} />
  </Stack.Navigator>
);
