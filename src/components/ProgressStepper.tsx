import React, { type ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/theme';

import type { ProgressStepperProps } from '@/types/components.types';

/**
 * ProgressStepper
 *
 * A horizontal progress indicator showing step completion.
 * Displays a row of segments where completed steps are highlighted.
 *
 * @example
 * <ProgressStepper currentStep={2} totalSteps={5} />
 */
export const ProgressStepper = ({
  currentStep,
  totalSteps,
}: ProgressStepperProps): ReactElement | null => {
  const safeCurrentStep = currentStep > 0 ? currentStep : 1;
  const safeTotalSteps = totalSteps >= 2 ? totalSteps : undefined;

  if (safeTotalSteps === undefined) {
    return null;
  }

  return (
    <View style={styles.stepperContainer}>
      {Array.from({ length: safeTotalSteps }).map((_, index) => {
        const isActive = index < safeCurrentStep;
        return (
          <View
            key={index}
            style={[
              styles.stepSegment,
              isActive ? styles.stepSegmentActive : styles.stepSegmentInactive,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    gap: spacing['Spacing-m'],
    paddingHorizontal: spacing['Spacing-xs'],
  },
  stepSegment: {
    flex: 1,
    height: radius.sm,
    borderRadius: radius.xs,
  },
  stepSegmentActive: {
    backgroundColor: colors.PrimaryMain,
  },
  stepSegmentInactive: {
    backgroundColor: colors.BorderSecondaryDefault,
  },
});
