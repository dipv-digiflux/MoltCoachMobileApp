/**
 * Notification categories. Backend should send one of these in FCM data.type or data.category.
 * Each category maps to an Android channel so users can control priority per category in system settings.
 */
export type NotificationCategory =
  | 'tasks'
  | 'meals'
  | 'profile'
  | 'promotions'
  | 'general';

/** All supported categories; use for validation or channel setup. */
export const NOTIFICATION_CATEGORIES: readonly NotificationCategory[] = [
  'tasks',
  'meals',
  'profile',
  'promotions',
  'general',
] as const;

/** Default category when FCM payload does not include type/category. */
export const DEFAULT_NOTIFICATION_CATEGORY: NotificationCategory = 'general';

/**
 * App-specific FCM data payload. Backend should send at least `type` (or `category`) for routing.
 */
export interface FCMDataPayload {
  /** Notification category – determines Android channel and in-app routing */
  type?: NotificationCategory;
  /** Alias for type (some backends use "category") */
  category?: NotificationCategory;
  /** Screen or route to open when notification is tapped (e.g. "TaskDetails", "MealsHome") */
  screen?: string;
  /** Entity id for deep link (e.g. task id, meal id) */
  id?: string;
  [key: string]: string | undefined;
}

/**
 * Parsed notification payload for in-app handling (navigation, analytics).
 */
export interface ParsedNotificationPayload {
  category: NotificationCategory;
  screen: string | undefined;
  id: string | undefined;
  data: Record<string, string | undefined>;
}

/**
 * Type guard: checks if a string is a valid NotificationCategory.
 */
export const isNotificationCategory = (
  value: string | undefined,
): value is NotificationCategory =>
  typeof value === 'string' &&
  (NOTIFICATION_CATEGORIES as ReadonlyArray<string>).includes(value);
