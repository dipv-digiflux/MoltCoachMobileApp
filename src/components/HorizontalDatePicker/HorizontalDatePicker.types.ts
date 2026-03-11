import { type StyleProp, type ViewStyle } from 'react-native';

import type { DayItem } from '@/types/components.types';

export type { DayItem };

/** Props for the HorizontalDatePicker component. */
export interface HorizontalDatePickerProps {
  /** Number of past days to show. @default 7 */
  pastDays?: number;

  /** Maximum selectable date. */
  maxDate?: Date;

  /** Extra days to disable after maxDate. @default 7 */
  extraDisabledDays?: number;

  /** Callback when a date is selected. */
  onDateSelect?: (date: Date) => void;

  /** Array of dates that should be disabled. */
  disabledDates?: Date[];

  /** Whether to disable weekends (Saturday and Sunday). @default false */
  disableWeekends?: boolean;

  /** Currently selected date string (format: 'yyyy-MM-dd'). */
  selectedDate?: string;

  /** Delivery start date - dates before this will be disabled. */
  deliveryStartDate?: Date;

  /** Optional fixed IANA timezone (e.g. "Asia/Dubai", "America/New_York"). */
  timeZone?: string;

  /** Test identifier. */
  testID?: string;

  /** Extra styles on the container. */
  style?: StyleProp<ViewStyle>;
}
