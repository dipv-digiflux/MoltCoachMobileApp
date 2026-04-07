import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Radio } from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';

import {
  ChangeFitnessPhaseBottomSheetProps,
  FitnessPhase,
} from './ChangeFitnessPhaseBottomSheet.types';

const PHASES: FitnessPhase[] = [
  'Build Muscle',
  'Burn Fat',
  'Performance',
  'Maintain',
];

export const ChangeFitnessPhaseBottomSheet = ({
  isVisible,
  onClose,
  currentPhase,
  onUpdate,
}: ChangeFitnessPhaseBottomSheetProps): React.ReactElement => {
  const [selectedPhase, setSelectedPhase] = useState<FitnessPhase | undefined>(
    currentPhase,
  );

  const handleUpdate = (): void => {
    if (selectedPhase) {
      onUpdate?.(selectedPhase);
      onClose();
    }
  };

  return (
    <BottomSheet
      visible={isVisible}
      onClose={onClose}
      header={{
        title: 'Change Fitness Phase',
        showCloseButton: true,
      }}
      footer={{
        children: (
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.updateButton,
                !selectedPhase && styles.updateButtonDisabled,
              ]}
              onPress={handleUpdate}
              disabled={!selectedPhase}
            >
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <View style={styles.content}>
        {PHASES.map(phase => {
          const isSelected = selectedPhase === phase;
          return (
            <TouchableOpacity
              key={phase}
              activeOpacity={0.7}
              style={[styles.optionCard, isSelected && styles.selectedCard]}
              onPress={() => setSelectedPhase(phase)}
            >
              <Text style={styles.optionLabel}>{phase}</Text>
              <Radio
                selected={isSelected}
                onPress={() => setSelectedPhase(phase)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing['Spacing-4xl'],
    gap: spacing['Spacing-xl'],
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['Spacing-4xl'],
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    borderRadius: moderateScale(4),
  },
  selectedCard: {
    borderColor: colors.PrimaryMain,
    borderWidth: 2,
  },
  optionLabel: {
    ...typography.b1Medium,
    color: colors.TextPrimaryDefault,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
    paddingTop: spacing['Spacing-xl'],
    paddingBottom: spacing['Spacing-4xl'],
  },
  cancelButton: {
    flex: 1,
    height: moderateScale(54),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.TextPrimaryDefault,
    borderRadius: moderateScale(4),
    backgroundColor: colors.StatesWhite,
  },
  cancelButtonText: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  updateButton: {
    flex: 1,
    height: moderateScale(54),
    backgroundColor: colors.PrimaryMain,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  updateButtonDisabled: {
    opacity: 0.5,
  },
  updateButtonText: {
    ...typography.b1SemiBold,
    color: colors.StatesWhite,
  },
});
