import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Button } from '@/components';
import { spacing } from '@/theme';
import { TimeWheelPicker } from './TimeWheelPicker';

export interface TimeSelectionBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (time: string) => void;
  initialValue: string;
  title?: string;
}

export const TimeSelectionBottomSheet = ({
  visible,
  onClose,
  onSelect,
  initialValue,
  title = 'Select reminder time',
}: TimeSelectionBottomSheetProps) => {
  const [time, setTime] = useState(initialValue);

  const handleSelect = () => {
    onSelect(time);
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
        <TimeWheelPicker value={time} onChange={setTime} />

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
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    gap: spacing['Spacing-l'],
  },
});
