import React, { useMemo, useState, type ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar';

import { Button } from '@/components';
import {
  colors,
  fontFamily,
  moderateScale,
  spacing,
  typography,
} from '@/theme';

import type { DateData, MarkedDates } from 'react-native-calendars/src/types';

export type DateSelectionCalendarProps = {
  /** Pre-selected date in ISO format 'YYYY-MM-DD'. */
  initialSelectedDate?: string;
  /** Minimum selectable date in ISO format 'YYYY-MM-DD'. */
  minDate?: string;
  /** Maximum selectable date in ISO format 'YYYY-MM-DD'. */
  maxDate?: string;
  /**
   * Called when user presses the inline Select button (when shown).
   * Receives the final selected date in ISO format 'YYYY-MM-DD'.
   */
  onDateSelect?: (date: string) => void;
  /**
   * Called whenever the active selected date changes (user taps a day).
   * Useful when the parent owns the confirm button (e.g. BottomSheet footer).
   */
  onActiveDateChange?: (date: string | undefined) => void;
  /**
   * Whether to render the inline Select button.
   * Set to false when using a parent-controlled footer button.
   * @default true
   */
  showInlineSelectButton?: boolean;
};

export const DateSelectionCalendar = ({
  initialSelectedDate,
  minDate,
  maxDate,
  onDateSelect,
  onActiveDateChange,
  showInlineSelectButton = true,
}: DateSelectionCalendarProps): ReactElement => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialSelectedDate,
  );

  const markedDates: MarkedDates = useMemo(() => {
    if (!selectedDate) {
      return {};
    }

    return {
      [selectedDate]: {
        selected: true,
        customStyles: {
          container: styles.selectedDayContainer,
          text: styles.selectedDayText,
        },
      },
    };
  }, [selectedDate]);

  const handleDayPress = (day: DateData): void => {
    setSelectedDate(day.dateString);
    onActiveDateChange?.(day.dateString);
  };

  const handleConfirm = (): void => {
    if (!selectedDate || onDateSelect === undefined) {
      return;
    }
    onDateSelect(selectedDate);
  };

  return (
    <View style={styles.container}>
      <Calendar
        initialDate={initialSelectedDate}
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="custom"
        hideExtraDays
        enableSwipeMonths
        theme={{
          calendarBackground: colors.StatesWhite,
          textSectionTitleColor: colors.TextSecondaryDefault,
          todayTextColor: colors.PrimaryMain,
          dayTextColor: colors.TextPrimaryDefault,
          textDisabledColor: colors.TextPrimaryDisabled,
          arrowColor: colors.PrimaryMain,
          monthTextColor: colors.TextPrimaryDefault,
          textDayFontFamily: fontFamily.inter,
          textDayFontSize: typography.bodySmall1Regular.fontSize,
          textMonthFontFamily: fontFamily.interRegular,
          textMonthFontSize: typography.b1SemiBold.fontSize,
          textDayHeaderFontFamily: fontFamily.interRegular,
          textDayHeaderFontSize: typography.bodySmall1Medium.fontSize,
        }}
        style={styles.calendar}
      />

      {showInlineSelectButton ? (
        <View style={styles.footer}>
          <Button
            label="Select"
            onPress={handleConfirm}
            style={styles.selectButton}
            disabled={!selectedDate}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-10xl'],
    backgroundColor: colors.StatesWhite,
  },
  calendar: {
    borderRadius: moderateScale(4),
  },
  selectedDayContainer: {
    backgroundColor: colors.PrimaryMain,
    borderRadius: moderateScale(999),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedDayText: {
    ...typography.bodySmall1Medium,
    color: colors.StatesWhite,
  },
  footer: {
    marginTop: spacing['Spacing-10xl'],
  },
  selectButton: {
    alignSelf: 'stretch',
  },
});
