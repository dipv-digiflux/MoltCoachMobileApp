import React, { type ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';

import { colors, spacing, moderateScale } from '@/theme';

type ProgressStepperProps = {
  /** Current step index (1-based). */
  currentStep: number;

  /** Total steps for the progress stepper (>= 2 to show). */
  totalSteps: number;
};

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
    height: moderateScale(4),
    borderRadius: moderateScale(2),
  },
  stepSegmentActive: {
    backgroundColor: colors.PrimaryMain,
  },
  stepSegmentInactive: {
    backgroundColor: colors.BorderSecondaryDefault,
  },
});
