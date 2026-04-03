import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, moderateScale, spacing, typography } from '@/theme';
import { ITEM_HEIGHT, Wheel } from './Wheel';

export interface TimeWheelPickerProps {
  value: string; // "hh:mm AM" or "hh:mm PM"
  onChange: (value: string) => void;
}

export const TimeWheelPicker = ({ value, onChange }: TimeWheelPickerProps) => {
  const [time, period] = value.split(' ');
  const [hour, minute] = time.split(':');

  const hours = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')),
    [],
  );
  const minutes = useMemo(
    () => Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')),
    [],
  );
  const periods = ['AM', 'PM'];

  const handleHourChange = (newHour: string) => {
    onChange(`${newHour}:${minute} ${period}`);
  };

  const handleMinuteChange = (newMinute: string) => {
    onChange(`${hour}:${newMinute} ${period}`);
  };

  const handlePeriodChange = (newPeriod: string) => {
    onChange(`${hour}:${minute} ${newPeriod}`);
  };

  return (
    <View style={styles.container}>
      <Wheel
        data={hours}
        selectedValue={hour}
        onValueChange={handleHourChange}
      />
      <Wheel
        data={minutes}
        selectedValue={minute}
        onValueChange={handleMinuteChange}
      />
      <Wheel
        data={periods}
        selectedValue={period}
        onValueChange={handlePeriodChange}
        width={moderateScale(50)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing['Spacing-8xl'],
    height: ITEM_HEIGHT * 5,
  },
});
