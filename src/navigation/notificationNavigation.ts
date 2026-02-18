import type { ParsedNotificationPayload } from '@/types/pushNotification.types';
import type {
  AppStackParamList,
  HomeStackParamList,
  ProfileStackParamList,
  RootStackParamList,
  ShopStackParamList,
} from '@navigation/types';
import type {
  NavigationContainerRefWithCurrent,
  NavigatorScreenParams,
} from '@react-navigation/native';

/**
 * Maps notification category to the bottom tab that hosts the target screen.
 * Align with your navigation types and backend FCM data.screen values.
 */
const CATEGORY_TO_TAB: Record<
  ParsedNotificationPayload['category'],
  'HomeTab' | 'ShopTab' | 'ProfileTab'
> = {
  tasks: 'HomeTab',
  meals: 'ShopTab',
  profile: 'ProfileTab',
  promotions: 'HomeTab',
  general: 'HomeTab',
};

type TabName = 'HomeTab' | 'ShopTab' | 'ProfileTab';

/** Screens that accept an id param (e.g. taskId). */
const SCREENS_WITH_ID = new Set([
  'TaskDetails',
  'TaskProgress',
  'TaskCompletion',
  'EditTask',
]);

type HomeScreenWithId = 'TaskDetails' | 'TaskProgress' | 'TaskCompletion';

/**
 * Handles navigation when user opens the app from a push notification.
 * Call from onNotificationOpened / getInitialNotification with the parsed payload.
 * Delays briefly so the navigator is ready (e.g. after cold start).
 */
export const handleNotificationOpen = (
  navigationRef: NavigationContainerRefWithCurrent<RootStackParamList>,
  payload: ParsedNotificationPayload,
): void => {
  if (!navigationRef.isReady()) {
    setTimeout(() => handleNotificationOpen(navigationRef, payload), 100);
    return;
  }

  const tab: TabName | undefined = CATEGORY_TO_TAB[payload.category];
  const screen = payload.screen;
  const id = payload.id;

  const state = navigationRef.getState();
  const currentRoute = state?.routes[state.index];
  const currentName = currentRoute?.name;
  if (currentName !== 'AppStack' || !tab) return;

  if (tab === 'HomeTab') {
    const homeParams: NavigatorScreenParams<HomeStackParamList> =
      screen && id && SCREENS_WITH_ID.has(screen)
        ? { screen: screen as HomeScreenWithId, params: { taskId: id } }
        : screen
        ? { screen: screen as keyof HomeStackParamList }
        : { screen: 'HomeDashboard' };
    const params: AppStackParamList['BottomTabs'] = {
      screen: 'HomeTab',
      params: homeParams,
    };
    navigationRef.navigate('AppStack', { screen: 'BottomTabs', params });
    return;
  }

  if (tab === 'ShopTab') {
    const shopParams: NavigatorScreenParams<ShopStackParamList> = screen
      ? { screen: screen as keyof ShopStackParamList }
      : { screen: 'MealsHome' };
    const params: AppStackParamList['BottomTabs'] = {
      screen: 'ShopTab',
      params: shopParams,
    };
    navigationRef.navigate('AppStack', { screen: 'BottomTabs', params });
    return;
  }

  // ProfileTab
  const profileParams: NavigatorScreenParams<ProfileStackParamList> = screen
    ? { screen: screen as keyof ProfileStackParamList }
    : { screen: 'ProfileHome' };
  const params: AppStackParamList['BottomTabs'] = {
    screen: 'ProfileTab',
    params: profileParams,
  };
  navigationRef.navigate('AppStack', { screen: 'BottomTabs', params });
};
