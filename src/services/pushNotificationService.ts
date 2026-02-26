import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  AuthorizationStatus as NotifeeAuthorizationStatus,
} from '@notifee/react-native';
import messaging, {
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

import {
  DEFAULT_NOTIFICATION_CATEGORY,
  isNotificationCategory,
  type FCMDataPayload,
  type ParsedNotificationPayload,
} from '@/types/pushNotification.types';

import type { NotificationCategory } from '@/types/pushNotification.types';

/** Android channel config per category – users can mute/prioritize per category in system settings */
const CATEGORY_CHANNELS: Record<
  NotificationCategory,
  { id: string; name: string; importance: AndroidImportance }
> = {
  tasks: {
    id: 'fcm_tasks',
    name: 'Tasks & reminders',
    importance: AndroidImportance.HIGH,
  },
  meals: {
    id: 'fcm_meals',
    name: 'Meals & shop',
    importance: AndroidImportance.HIGH,
  },
  profile: {
    id: 'fcm_profile',
    name: 'Account & profile',
    importance: AndroidImportance.DEFAULT,
  },
  promotions: {
    id: 'fcm_promotions',
    name: 'Offers & promotions',
    importance: AndroidImportance.DEFAULT,
  },
  general: {
    id: 'fcm_general',
    name: 'General',
    importance: AndroidImportance.DEFAULT,
  },
};

/** Legacy single channel id for fallback (pre-category). */
const ANDROID_CHANNEL_ID_LEGACY = 'fcm_default_channel';

/**
 * Creates Android notification channels for all categories. Call once at startup.
 */
export const ensureAllChannels = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;
  const channels = Object.values(CATEGORY_CHANNELS).map(c => ({
    id: c.id,
    name: c.name,
    importance: c.importance,
  }));
  await notifee.createChannels(channels);
  await notifee.createChannel({
    id: ANDROID_CHANNEL_ID_LEGACY,
    name: 'Default',
    importance: AndroidImportance.HIGH,
  });
};

/**
 * Resolves category from FCM message (data.type or data.category). Defaults to 'general'.
 */
export const getCategoryFromMessage = (
  message: FirebaseMessagingTypes.RemoteMessage,
): NotificationCategory => {
  const data = message.data as FCMDataPayload | undefined;
  const raw = data?.type ?? data?.category;
  return isNotificationCategory(raw) ? raw : DEFAULT_NOTIFICATION_CATEGORY;
};

/**
 * Parses FCM message into category, screen, id and flat data for navigation/analytics.
 */
export const parseNotificationPayload = (
  message: FirebaseMessagingTypes.RemoteMessage,
): ParsedNotificationPayload => {
  const category = getCategoryFromMessage(message);
  const data = (message.data as FCMDataPayload | undefined) ?? {};
  const screen = data.screen;
  const id = data.id;
  const flat: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(data)) {
    flat[k] = typeof v === 'string' ? v : undefined;
  }
  return { category, screen, id, data: flat };
};

const getChannelIdForCategory = (category: NotificationCategory): string =>
  CATEGORY_CHANNELS[category]?.id ?? CATEGORY_CHANNELS.general.id;

/**
 * Displays a local notification when an FCM message is received in the foreground.
 * Uses category from message.data.type / data.category to pick the Android channel.
 */
const displayForegroundNotification = async (
  message: FirebaseMessagingTypes.RemoteMessage,
): Promise<void> => {
  const category = getCategoryFromMessage(message);
  const channelId = getChannelIdForCategory(category);

  const notification = message.notification;
  const title =
    notification?.title ?? message.data?.title ?? 'New notification';
  const body = notification?.body ?? message.data?.body ?? '';
  const messageId = message.messageId ?? `fcm-${Date.now()}`;

  await ensureAllChannels();

  await notifee.displayNotification({
    id: messageId,
    title: typeof title === 'string' ? title : 'New notification',
    body: typeof body === 'string' ? body : '',
    data: message.data as
      | { [key: string]: string | object | number }
      | undefined,
    android: {
      channelId,
      pressAction: { id: 'default' },
    },
  });
};

/**
 * Request notification permission. Must be called before getFCMToken for the token to be valid for showing notifications.
 * - iOS: uses Firebase messaging (alerts/sound/badge).
 * - Android 13+: uses Notifee to request POST_NOTIFICATIONS (system dialog). Without this, FCM token may exist but notifications stay off.
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const settings = await notifee.requestPermission();
    return (
      settings.authorizationStatus >= NotifeeAuthorizationStatus.AUTHORIZED
    );
  }
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

/**
 * Get the current FCM token. Only call after permission is granted (e.g. after requestNotificationPermission returns true).
 */
export const getFCMToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    return token;
  } catch {
    return null;
  }
};

/**
 * Subscribe to foreground FCM messages and show a local notification (per category channel).
 * Returns an unsubscribe function.
 */
export const onForegroundMessage = (
  handler: (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => void | Promise<void>,
): (() => void) => {
  return messaging().onMessage(async message => {
    await displayForegroundNotification(message);
    await Promise.resolve(handler(message));
  });
};

/**
 * Notification that opened the app from background/quit (cold start).
 */
export const getInitialNotification =
  async (): Promise<FirebaseMessagingTypes.RemoteMessage | null> =>
    messaging().getInitialNotification();

/**
 * Subscribe to notification opened app (user tapped notification while in background).
 */
export const onNotificationOpenedApp = (
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => void,
): (() => void) => messaging().onNotificationOpenedApp(handler);

/**
 * Background message handler. Must be set at top-level (e.g. index.js) before app is registered.
 */
export const setBackgroundMessageHandler = (
  handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<void>,
): void => {
  messaging().setBackgroundMessageHandler(handler);
};

/**
 * Sets up only listeners for foreground messages and notification-opened. Does NOT request permission or get token.
 * Call once at app root (e.g. App.tsx) so that tapping a notification can route; permission/token happen after login.
 */
export const setupPushNotificationListeners = (options: {
  onNotificationOpened: (message: FirebaseMessagingTypes.RemoteMessage) => void;
  onForegroundMessage?: (message: FirebaseMessagingTypes.RemoteMessage) => void;
}): (() => void) => {
  const { onNotificationOpened } = options;
  const userForegroundHandler = options.onForegroundMessage ?? ((): void => {});

  const unsubForeground = onForegroundMessage(async message => {
    await displayForegroundNotification(message);
    await Promise.resolve(userForegroundHandler(message));
  });
  const unsubOpened = onNotificationOpenedApp(onNotificationOpened);

  void (async (): Promise<void> => {
    const initial = await getInitialNotification();
    if (initial) onNotificationOpened(initial);
  })();

  return () => {
    unsubForeground();
    unsubOpened();
  };
};

/**
 * Call after login: requests notification permission (iOS + Android 13+), then gets FCM token only if granted.
 * Send the token to your backend here (e.g. POST /users/me/fcm-token). Does not set up listeners.
 */
export const registerPushNotifications = async (
  onToken?: (token: string) => void,
): Promise<string | null> => {
  await ensureAllChannels();
  const granted = await requestNotificationPermission();
  if (!granted) return null;
  const token = await getFCMToken();
  if (token && onToken) onToken(token);
  return token;
};
