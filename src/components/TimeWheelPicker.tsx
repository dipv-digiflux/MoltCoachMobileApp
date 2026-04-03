import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { moderateScale, spacing } from '@/theme';

import { ITEM_HEIGHT, Wheel } from './Wheel';

import type { TimeWheelPickerProps } from './TimeWheelPicker.types';

export const TimeWheelPicker = ({
  value,
  onChange,
}: TimeWheelPickerProps): React.ReactElement => {
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

  const handleHourChange = (newHour: string): void => {
    onChange(`${newHour}:${minute} ${period}`);
  };

  const handleMinuteChange = (newMinute: string): void => {
    onChange(`${hour}:${newMinute} ${period}`);
  };

  const handlePeriodChange = (newPeriod: string): void => {
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
