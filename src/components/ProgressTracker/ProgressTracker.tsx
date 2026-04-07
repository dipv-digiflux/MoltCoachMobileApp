import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';

import type {
  ProgressTrackerProps,
  ProgressTrackerStep,
} from './ProgressTracker.types';

// ── Icons ────────────────────────────────────────────────────────────

const CompletedIcon = (): ReactElement => (
  <View style={[styles.iconBase, styles.iconCompleted]}>
    <Svg
      width={iconScale(12)}
      height={iconScale(12)}
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
  </View>
);

const ActiveIcon = (): ReactElement => (
  <View style={[styles.iconBase, styles.iconActive]}>
    <Svg
      width={iconScale(24)}
      height={iconScale(24)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx="12"
        cy="12"
        r="11"
        stroke={colors.PrimaryMain}
        strokeWidth="2"
      />
      <Circle cx="12" cy="12" r="3" fill={colors.PrimaryMain} />
    </Svg>
  </View>
);

const PendingIcon = (): ReactElement => (
  <View style={[styles.iconBase, styles.iconPending]}>
    <Svg
      width={iconScale(24)}
      height={iconScale(24)}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Circle
        cx="12"
        cy="12"
        r="11"
        stroke={colors.StatesOutline}
        strokeWidth="2"
      />
    </Svg>
  </View>
);

// ── Sub-component ────────────────────────────────────────────────────

const StepItem = ({
  step,
  isLast,
}: {
  step: ProgressTrackerStep;
  isLast: boolean;
}): ReactElement => {
  const renderIcon = (): ReactElement => {
    switch (step.status) {
      case 'completed':
        return <CompletedIcon />;
      case 'active':
        return <ActiveIcon />;
      case 'pending':
      default:
        return <PendingIcon />;
    }
  };

  const labelStyle = [
    styles.label,
    step.status === 'pending' && styles.labelPending,
  ];

  const connectorStyle = [
    styles.connector,
    step.status === 'completed'
      ? styles.connectorSolid
      : styles.connectorSubtle,
  ];

  return (
    <View style={styles.stepContainer}>
      <View style={styles.leftColumn}>
        <View style={styles.iconWrapper}>{renderIcon()}</View>
        {!isLast && <View style={connectorStyle} />}
      </View>
      <View style={styles.rightColumn}>
        <Text style={labelStyle}>{step.label}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>
    </View>
  );
};

// ── Main Component ───────────────────────────────────────────────────

export const ProgressTracker = ({
  title,
  steps,
  style,
  testID,
}: ProgressTrackerProps): ReactElement => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <StepItem
            key={`${step.label}-${index}`}
            step={step}
            isLast={index === steps.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesWhite,
    paddingTop: spacing['Spacing-5xl'],
    paddingRight: spacing['Spacing-5xl'],
    paddingLeft: spacing['Spacing-5xl'],
    paddingBottom: 0,
  },
  title: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryStrong,
  },
  stepsWrapper: {
    paddingLeft: spacing['Spacing-xs'],
    marginTop: spacing['Spacing-10xl'],
  },
  stepContainer: {
    flexDirection: 'row',
    minHeight: moderateScale(80),
  },
  leftColumn: {
    alignItems: 'center',
    width: moderateScale(32),
    marginRight: spacing['Spacing-xl'],
  },
  iconWrapper: {
    height: moderateScale(32),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconBase: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCompleted: {
    backgroundColor: colors.MatrixMain,
  },
  iconActive: {
    backgroundColor: 'transparent',
  },
  iconPending: {
    backgroundColor: 'transparent',
  },
  connector: {
    width: moderateScale(2),
    borderRadius: moderateScale(19),
    flex: 1,
    minHeight: moderateScale(32),
    marginTop: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-m'],
  },
  connectorSolid: {
    backgroundColor: colors.PrimaryMain,
  },
  connectorSubtle: {
    backgroundColor: colors.StatesOutline,
  },
  rightColumn: {
    flex: 1,
    paddingTop: moderateScale(4),
  },
  label: {
    ...typography.b2SemiBold,
    color: colors.TextPrimaryStrong,
    marginBottom: spacing['Spacing-xs'],
  },
  labelPending: {
    color: colors.TextSecondaryDisabled,
  },
  description: {
    ...typography.bodySmall1TallRegular,
    color: colors.TextSecondaryDefault,
  },
});
