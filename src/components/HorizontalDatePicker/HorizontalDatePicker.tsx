/**
 * Horizontal Date Picker Component
 *
 * A performant, horizontally scrolling date picker with smooth animations.
 * Supports date selection, disabled dates, weekends, and custom date ranges.
 *
 * @example
 * <HorizontalDatePicker
 *   selectedDate="2024-01-22"
 *   onDateSelect={(date) => console.log(date)}
 *   disableWeekends
 * />
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type ReactElement,
} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { colors, moderateScale, spacing } from '@/theme';
import {
  formatDayTextContainer,
  getNowInTimeZone,
  toTimeZoneDate,
} from '@/utils/timeZone';

import { DayItemComponent } from './DayItemComponent';
import {
  type DayItem,
  type HorizontalDatePickerProps,
} from './HorizontalDatePicker.types';

// ─── Design constants ──────────────────────────────────────────────────

const DAY_ITEM_WIDTH = moderateScale(52);
const ITEM_GAP = spacing['Spacing-xl']; // 8px
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const startOfDayDate = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDaysToDate = (date: Date, days: number): Date => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

const differenceInCalendarDays = (endDate: Date, startDate: Date): number => {
  const end = startOfDayDate(endDate).getTime();
  const start = startOfDayDate(startDate).getTime();
  return Math.round((end - start) / MS_PER_DAY);
};

const isAfterDate = (left: Date, right: Date): boolean =>
  left.getTime() > right.getTime();

const isBeforeDate = (left: Date, right: Date): boolean =>
  left.getTime() < right.getTime();

const isSameDayDate = (left: Date, right: Date): boolean =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const formatDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ─── Component ─────────────────────────────────────────────────────────

/**
 * A horizontal scrolling date picker component optimized for performance.
 * Supports date selection, disabled dates, weekends, and smooth animations.
 */
export const HorizontalDatePicker = ({
  pastDays = 7,
  maxDate,
  extraDisabledDays = 7,
  onDateSelect,
  disabledDates = [],
  disableWeekends = false,
  selectedDate,
  deliveryStartDate,
  timeZone,
  testID,
  style,
}: HorizontalDatePickerProps): ReactElement => {
  const listRef = useRef<FlatList<DayItem>>(null);
  const pickerTimeZone = typeof timeZone === 'string' ? timeZone : undefined;
  const today = useMemo(
    () => startOfDayDate(getNowInTimeZone(pickerTimeZone)),
    [pickerTimeZone],
  );

  // ─── Generate days array ─────────────────────────────────────────────

  const days: DayItem[] = useMemo(() => {
    const daysArray: DayItem[] = [];
    const maxDateInZone = maxDate
      ? startOfDayDate(toTimeZoneDate(maxDate, pickerTimeZone))
      : null;
    const disabledDatesInZone = disabledDates.map(date =>
      startOfDayDate(toTimeZoneDate(date, pickerTimeZone)),
    );
    const deliveryStartInZone = deliveryStartDate
      ? startOfDayDate(toTimeZoneDate(deliveryStartDate, pickerTimeZone))
      : null;

    const startDate = addDaysToDate(today, -pastDays);
    const endDate = maxDateInZone
      ? addDaysToDate(maxDateInZone, extraDisabledDays)
      : addDaysToDate(today, 7);
    const totalDays = differenceInCalendarDays(endDate, startDate) + 1;

    for (let i = 0; i < totalDays; i++) {
      const currentDate = addDaysToDate(startDate, i);
      const dayOfWeek = currentDate.getDay();
      const dateString = formatDateKey(currentDate);

      // Check if date should be disabled
      const isBeyondMaxDate = maxDateInZone
        ? isAfterDate(currentDate, maxDateInZone)
        : false;
      const isBeforeDeliveryStart = deliveryStartInZone
        ? isBeforeDate(currentDate, deliveryStartInZone)
        : false;
      const isInDisabledDates = disabledDatesInZone.some(disabledDate =>
        isSameDayDate(currentDate, disabledDate),
      );
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isDisabled =
        isBeyondMaxDate ||
        isBeforeDeliveryStart ||
        (disableWeekends && isWeekend) ||
        isInDisabledDates;

      // Use formatDayTextContainer for consistent formatting
      const { dayName, dayNumber } = formatDayTextContainer(
        currentDate,
        pickerTimeZone,
      );

      daysArray.push({
        date: currentDate,
        dateString,
        dayName,
        dayNumber,
        isPast: isBeforeDate(currentDate, today),
        isToday: isSameDayDate(currentDate, today),
        isDisabled,
      });
    }

    return daysArray;
  }, [
    today,
    pastDays,
    maxDate,
    extraDisabledDays,
    disabledDates,
    disableWeekends,
    deliveryStartDate,
    pickerTimeZone,
  ]);

  // ─── Scroll to selected date ────────────────────────────────────────

  useEffect(() => {
    if (!selectedDate || !listRef.current) return;

    const selectedIndex = days.findIndex(
      day => day.dateString === selectedDate,
    );

    if (selectedIndex >= 0) {
      // Small delay to ensure FlatList is rendered
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: true,
          viewPosition: 0.5, // Center the selected item
        });
      }, 100);
    }
  }, [selectedDate, days]);

  // ─── Handlers ────────────────────────────────────────────────────────

  const handleDatePress = useCallback(
    (item: DayItem) => {
      if (!item.isDisabled) {
        onDateSelect?.(item.date);
      }
    },
    [onDateSelect],
  );

  const renderDay = useCallback(
    ({ item }: { item: DayItem }) => {
      const isSelected = item.dateString === selectedDate;
      return (
        <DayItemComponent
          item={item}
          isSelected={isSelected}
          onPress={handleDatePress}
        />
      );
    },
    [selectedDate, handleDatePress],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: DAY_ITEM_WIDTH + ITEM_GAP,
      offset: (DAY_ITEM_WIDTH + ITEM_GAP) * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item: DayItem) => item.dateString, []);

  // ─── Render ──────────────────────────────────────────────────────────

  return (
    <View style={[styles.container, style]} testID={testID}>
      <FlatList
        ref={listRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={days}
        keyExtractor={keyExtractor}
        renderItem={renderDay}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
        onScrollToIndexFailed={info => {
          // Fallback: scroll to offset if scrollToIndex fails
          setTimeout(() => {
            listRef.current?.scrollToOffset({
              offset: info.averageItemLength * info.index,
              animated: true,
            });
          }, 500);
        }}
      />
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    paddingVertical: spacing['Spacing-xl'],
  },
  listContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-m'],
  },
});
