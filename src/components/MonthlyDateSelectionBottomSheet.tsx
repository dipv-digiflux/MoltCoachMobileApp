import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button } from '@/components';
import { colors, moderateScale, spacing } from '@/theme';

import { ITEM_HEIGHT, Wheel } from './Wheel';

import type { MonthlyDateSelectionBottomSheetProps } from './MonthlyDateSelectionBottomSheet.types';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 11 }, (_, i) => String(2024 + i));

export const MonthlyDateSelectionBottomSheet = ({
  visible,
  onClose,
  onSelect,
  initialValue,
  title = 'Select monthly date',
}: MonthlyDateSelectionBottomSheetProps): React.ReactElement => {
  const [month, setMonth] = useState(initialValue?.month || 'April');
  const [day, setDay] = useState(initialValue?.day || '3');
  const [year, setYear] = useState(initialValue?.year || '2026');

  const handleSelect = (): void => {
    onSelect({ month, day, year });
    onClose();
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      variant="form"
      header={{ title }}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          {/* Active indicator lines */}
          <View style={styles.indicatorContainer}>
            <View style={styles.indicatorLine} />
            <View style={styles.indicatorLine} />
          </View>

          <View style={styles.wheelsRow}>
            <Wheel
              data={MONTHS}
              selectedValue={month}
              onValueChange={setMonth}
              width={moderateScale(100)}
            />
            <Wheel
              data={DAYS}
              selectedValue={day}
              onValueChange={setDay}
              width={moderateScale(50)}
            />
            <Wheel
              data={YEARS}
              selectedValue={year}
              onValueChange={setYear}
              width={moderateScale(80)}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Button
            label="Select"
            onPress={handleSelect}
            variant="primary"
            fullWidth
          />
          <Button
            label="Cancel"
            onPress={onClose}
            variant="secondary"
            fullWidth
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-xl'],
    gap: spacing['Spacing-10xl'],
  },
  pickerContainer: {
    height: ITEM_HEIGHT * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    gap: ITEM_HEIGHT,
    paddingHorizontal: spacing['Spacing-xl'],
  },
  indicatorLine: {
    height: 1,
    backgroundColor: colors.StatesOutline,
  },
  wheelsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-5xl'],
  },
  footer: {
    gap: spacing['Spacing-l'],
  },
});
