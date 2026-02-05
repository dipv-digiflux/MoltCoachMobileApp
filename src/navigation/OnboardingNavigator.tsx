import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './types';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { IntroCarouselScreen } from '../screens/onboarding/IntroCarouselScreen';
import { GetStartedScreen } from '../screens/onboarding/GetStartedScreen';
import { OTPVerificationScreen } from '../screens/onboarding/OTPVerificationScreen';
import { YourDetailsScreen } from '../screens/onboarding/YourDetailsScreen';
import { ConnectHealthScreen } from '../screens/onboarding/ConnectHealthScreen';
import { PlanPreviewScreen } from '../screens/onboarding/PlanPreviewScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingNavigator() {
  return (
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
}
