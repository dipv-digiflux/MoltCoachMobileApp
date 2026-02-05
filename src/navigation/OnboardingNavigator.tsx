import React, { type ReactElement } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ConnectHealthScreen } from '@screens/onboarding/ConnectHealthScreen';
import { GetStartedScreen } from '@screens/onboarding/GetStartedScreen';
import { IntroCarouselScreen } from '@screens/onboarding/IntroCarouselScreen';
import { OTPVerificationScreen } from '@screens/onboarding/OTPVerificationScreen';
import { PlanPreviewScreen } from '@screens/onboarding/PlanPreviewScreen';
import { SplashScreen } from '@screens/onboarding/SplashScreen';
import { YourDetailsScreen } from '@screens/onboarding/YourDetailsScreen';

import type { OnboardingStackParamList } from '@navigation/types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator = (): ReactElement => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="IntroCarousel" component={IntroCarouselScreen} />
    <Stack.Screen name="GetStarted" component={GetStartedScreen} />
    <Stack.Screen
      name="OTPVerification"
      component={OTPVerificationScreen}
      options={{
        gestureEnabled: false,
      }}
    />
    <Stack.Screen name="YourDetails" component={YourDetailsScreen} />
    <Stack.Screen name="ConnectHealth" component={ConnectHealthScreen} />
    <Stack.Screen name="PlanPreview" component={PlanPreviewScreen} />
  </Stack.Navigator>
);
