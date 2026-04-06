import { View, Text, StyleSheet } from 'react-native';

import { Input } from '@/components';
import { typography, colors, spacing } from '@/theme';

import { DayInputsProps } from '../../NewTransferScreen.types';

export const DayInputs: React.FC<DayInputsProps> = ({
  fromDays,
  toDays,
  setFromDays,
  setToDays,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.inputBox}>
        <Text style={[styles.label, { color: '#7A8585' }]}>From (Days)</Text>
        <Input
          value={fromDays}
          onChangeText={setFromDays}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputBox}>
        <Text style={[styles.label, { color: '#7A8585' }]}>To (Days)</Text>
        <Input value={toDays} onChangeText={setToDays} keyboardType="numeric" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextSecondaryDisabled,
    marginBottom: spacing['Spacing-5xl'],
  },
  row: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
  },
  inputBox: {
    flex: 1,
  },
});
