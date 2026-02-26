import { createNavigationContainerRef } from '@react-navigation/native';

import type { RootStackParamList } from '@navigation/types';

/**
 * Root navigation ref. Used by NavigationContainer in App and by logout flow
 * to reset the app to onboarding (IntroCarousel) without coupling store to App.
 */
export const rootNavigationRef =
  createNavigationContainerRef<RootStackParamList>();
