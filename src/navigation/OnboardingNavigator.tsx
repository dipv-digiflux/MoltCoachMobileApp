import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GettingThingsReadyScreen } from '@/screens/loading/GettingThingsReadyScreen';
import {
  GetStartedScreen,
  IntroCarouselScreen,
  SplashScreen,
  OTPVerificationScreen,
  PlanPreviewScreen,
  BookingConfirmScreen,
  ApplicationNotApprovedScreen,
} from '@/screens/onboarding';
import { RequestAccessScreen } from '@/screens/profile/RequestAccessScreen';

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
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen
      name="IntroCarousel"
      component={IntroCarouselScreen}
      options={{ animation: 'fade' }}
    />
    <Stack.Screen name="GetStarted" component={GetStartedScreen} />
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
    <Stack.Screen name="BookSchedule" component={BookingConfirmScreen} />

    <Stack.Screen
      name="ApplicationNotApproved"
      component={ApplicationNotApprovedScreen}
    />
  </Stack.Navigator>
);
