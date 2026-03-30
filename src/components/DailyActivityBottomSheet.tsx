import React, { useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BottomSheet, Radio } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

import type { DailyActivityBottomSheetProps } from './DailyActivityBottomSheet.types';

export const DailyActivityBottomSheet = ({
  visible,
  onClose,
  initialValue,
  onSelect,
}: DailyActivityBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    initialValue,
  );

  const options = [
    { label: 'High Output', value: 'High Output' },
    { label: 'Get Stronger', value: 'Get Stronger' },
    { label: 'Moderate Activity', value: 'Moderate Activity' },
    { label: 'Sedentary', value: 'Sedentary' },
    { label: 'Lightly Active', value: 'Lightly Active' },
    { label: 'Athlete Mode', value: 'Athlete Mode' },
  ];

  const handleSave = (): void => {
    if (selectedValue) {
      onSelect(selectedValue);
    }
  };

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{ title: translation.dailyActivityHeaderTitle }}
      footer={{
        primaryLabel: 'Save Changes',
        onPrimaryPress: handleSave,
      }}
    >
      <View style={styles.container}>
        {options.map(option => {
          const isSelected = selectedValue === option.value;
          return (
            <Pressable
              key={option.value}
              style={[styles.optionRow, isSelected && styles.optionRowSelected]}
              onPress={() => setSelectedValue(option.value)}
            >
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Radio
                selected={isSelected}
                onPress={() => setSelectedValue(option.value)}
              />
            </Pressable>
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-xl'],
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['Spacing-4xl'],
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    borderRadius: radius.md,
    backgroundColor: colors.StatesWhite,
  },
  optionRowSelected: {
    borderColor: colors.PrimaryMain,
    borderWidth: 2,
  },
  optionLabel: {
    ...typography.b1Regular,
    color: colors.PrimaryMain,
  },
});
