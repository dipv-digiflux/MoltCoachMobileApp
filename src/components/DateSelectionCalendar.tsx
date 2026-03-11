import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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

const TODAY_ISO = ((): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(d.getDate()).padStart(2, '0')}`;
})();

const formatMonthYear = (isoDate: string): string => {
  const d = new Date(isoDate + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

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
  const initialVisibleDate = initialSelectedDate ?? maxDate ?? TODAY_ISO;

  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    initialSelectedDate,
  );
  const [visibleDate, setVisibleDate] = useState<string>(initialVisibleDate);
  const [yearPickerVisible, setYearPickerVisible] = useState(false);

  useEffect(() => {
    setVisibleDate(initialSelectedDate ?? maxDate ?? TODAY_ISO);
  }, [initialSelectedDate, maxDate]);

  const minYear = minDate
    ? parseInt(minDate.slice(0, 4), 10)
    : new Date().getFullYear() - 120;
  const maxYear = maxDate
    ? parseInt(maxDate.slice(0, 4), 10)
    : new Date().getFullYear();
  const yearList = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear]);

  const currentVisibleYear = parseInt(visibleDate.slice(0, 4), 10);
  const yearListInitialIndex = useMemo(() => {
    const idx = yearList.indexOf(currentVisibleYear);
    return idx >= 0 ? idx : 0;
  }, [yearList, currentVisibleYear]);

  const handleYearSelect = useCallback(
    (year: number) => {
      const month = visibleDate.slice(5, 7);
      setVisibleDate(`${year}-${month}-01`);
      setYearPickerVisible(false);
    },
    [visibleDate],
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

  const renderCalendarHeader = useCallback(
    () => (
      <Pressable
        onPress={() => setYearPickerVisible(true)}
        style={styles.headerTitleTouchable}
        accessibilityLabel={`${formatMonthYear(
          visibleDate,
        )}, tap to change year`}
        accessibilityRole="button"
      >
        <Text style={styles.headerTitleText} allowFontScaling={false}>
          {formatMonthYear(visibleDate)}
        </Text>
      </Pressable>
    ),
    [visibleDate],
  );

  const renderYearItem = useCallback(
    ({ item }: { item: number }) => (
      <Pressable
        style={({ pressed }) => [
          styles.yearItem,
          item === currentVisibleYear && styles.yearItemSelected,
          pressed && styles.yearItemPressed,
        ]}
        onPress={() => handleYearSelect(item)}
        accessibilityLabel={String(item)}
        accessibilityRole="button"
      >
        <Text
          style={[
            styles.yearItemText,
            item === currentVisibleYear && styles.yearItemTextSelected,
          ]}
          allowFontScaling={false}
        >
          {item}
        </Text>
      </Pressable>
    ),
    [currentVisibleYear, handleYearSelect],
  );

  const yearListKeyExtractor = useCallback((item: number) => String(item), []);

  return (
    <View style={styles.container}>
      <Calendar
        initialDate={visibleDate}
        minDate={minDate}
        maxDate={maxDate}
        onDayPress={handleDayPress}
        onMonthChange={(d: DateData) => setVisibleDate(d.dateString)}
        markedDates={markedDates}
        markingType="custom"
        hideExtraDays
        enableSwipeMonths
        renderHeader={renderCalendarHeader}
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

      <Modal
        visible={yearPickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setYearPickerVisible(false)}
      >
        <Pressable
          style={styles.yearPickerBackdrop}
          onPress={() => setYearPickerVisible(false)}
        >
          <View style={styles.yearPickerContainer}>
            <Text style={styles.yearPickerTitle} allowFontScaling={false}>
              Select year
            </Text>
            <FlatList
              data={yearList}
              keyExtractor={yearListKeyExtractor}
              renderItem={renderYearItem}
              initialScrollIndex={Math.min(
                yearListInitialIndex,
                Math.max(0, yearList.length - 10),
              )}
              getItemLayout={(_: unknown, index: number) => ({
                length: 48,
                offset: 48 * index,
                index,
              })}
              style={styles.yearList}
              bounces={false}
            />
            <Pressable
              style={styles.yearPickerCloseButton}
              onPress={() => setYearPickerVisible(false)}
            >
              <Text style={styles.yearPickerCloseText} allowFontScaling={false}>
                Close
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

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
  headerTitleTouchable: {
    paddingVertical: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-xl'],
  },
  headerTitleText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
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
  yearPickerBackdrop: {
    flex: 1,
    backgroundColor: colors.OverlayDarkHalf,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['Spacing-5xl'],
  },
  yearPickerContainer: {
    backgroundColor: colors.StatesWhite,
    borderRadius: moderateScale(8),
    maxHeight: '70%',
    width: '100%',
    maxWidth: moderateScale(280),
    overflow: 'hidden',
  },
  yearPickerTitle: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
    paddingVertical: spacing['Spacing-5xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    textAlign: 'center',
  },
  yearList: {
    maxHeight: moderateScale(280),
  },
  yearItem: {
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  yearItemPressed: {
    backgroundColor: colors.StatesFill1,
  },
  yearItemSelected: {
    backgroundColor: colors.StatesFill1,
  },
  yearItemText: {
    ...typography.b1Regular,
    color: colors.TextPrimaryDefault,
  },
  yearItemTextSelected: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },
  yearPickerCloseButton: {
    paddingVertical: spacing['Spacing-5xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.StatesOutline,
  },
  yearPickerCloseText: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },
});
