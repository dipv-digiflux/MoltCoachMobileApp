import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, moderateScale, spacing, typography } from '@/theme';

import type { VerticalStepperProps } from '@/types/components.types';

const CheckIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(12)}
    height={moderateScale(12)}
    viewBox="0 0 12 12"
    fill="none"
  >
    <Path
      d="M10 3L4.5 8.5L2 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HourglassIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(12)}
    height={moderateScale(12)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Path
      d="M5 22H19M5 2H19M6 2V8C6 11.3137 8.68629 14 12 14C15.3137 14 18 11.3137 18 8V2M6 22V16C6 12.6863 8.68629 10 12 10C15.3137 10 18 12.6863 18 16V22"
      stroke={colors.TextSecondaryDisabled}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * VerticalStepper
 *
 * A common component for displaying vertical progress steps.
 * Steps show a status icon (Check for completed, Hourglass for pending).
 */
export const VerticalStepper = ({
  steps,
}: VerticalStepperProps): ReactElement => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isCompleted = step.status === 'completed';
        const isPending = step.status === 'pending';

        return (
          <View key={index} style={styles.stepWrapper}>
            <View style={styles.leftColumn}>
              <View
                style={[
                  styles.dot,
                  isCompleted ? styles.dotCompleted : styles.dotPending,
                ]}
              >
                {isCompleted ? <CheckIcon /> : <HourglassIcon />}
              </View>
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    isCompleted && steps[index + 1].status === 'completed'
                      ? styles.lineCompleted
                      : styles.linePending,
                  ]}
                />
              )}
            </View>
            <View style={styles.rightColumn}>
              <Text
                style={[
                  styles.label,
                  isPending ? styles.labelPending : styles.labelActive,
                ]}
              >
                {step.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: spacing['Spacing-xl'],
  },
  stepWrapper: {
    flexDirection: 'row',
    minHeight: moderateScale(48),
    gap: spacing['Spacing-xl'],
  },
  leftColumn: {
    alignItems: 'center',
    width: moderateScale(24),
  },
  dot: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dotCompleted: {
    backgroundColor: colors.MatrixMain,
  },
  dotPending: {
    backgroundColor: colors.StatesFill1,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDisabled,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: colors.BorderPrimaryDisabled,
    position: 'absolute',
    top: moderateScale(24),
    bottom: 0,
  },
  lineCompleted: {
    backgroundColor: colors.MatrixMain,
  },
  linePending: {
    backgroundColor: colors.BorderPrimaryDisabled,
  },
  rightColumn: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: moderateScale(2),
  },
  label: {
    ...typography.bodySmall1SemiBold,
  },
  labelActive: {
    color: colors.TextPrimaryDefault,
  },
  labelPending: {
    color: colors.TextSecondaryDisabled,
  },
});
