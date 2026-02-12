import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { CurvedHeader, OnboardingHeader } from '@/components';
import { colors, spacing, typography, moderateScale } from '@/theme';

export const YourDetailsScreen = (): ReactElement => {
  return (
    <View style={styles.container}>
      <CurvedHeader statusBarStyle="dark-content">
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarRow}>
            <View
              style={[styles.progressSegment, styles.progressSegmentActive]}
            />
            <View style={styles.progressSegment} />
          </View>
        </View>

        <OnboardingHeader showSkip onSkipPress={'ConnectHealth'} />

        <View style={styles.content}>
          <View style={styles.headingBlock}>
            <Text style={styles.title}>Your details</Text>
            <Text style={styles.description}>
              Accurate metrics help us calculate your personalized fitness plan
              and daily targets.
            </Text>
          </View>
        </View>
      </CurvedHeader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  progressBarContainer: {
    paddingHorizontal: spacing['Spacing-2xl'],
  },
  progressBarRow: {
    flexDirection: 'row',
    columnGap: spacing['Spacing-m'],
  },
  progressSegment: {
    flex: 1,
    height: moderateScale(4),
    borderRadius: moderateScale(2),
    backgroundColor: colors.StatesDivider,
  },
  progressSegmentActive: {
    backgroundColor: colors.TextPrimaryDefault,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  headingBlock: {
    // marginBottom: spacing['Spacing-11xl'],
  },
  title: {
    ...typography.h6SemiBold,
    color: colors.TextPrimaryDefault,
    marginBottom: spacing['Spacing-3xl'],
  },
  description: {
    ...typography.bodySmall1Regular,
    color: colors.PrimarySecondary,
  },
  primaryButton: {
    width: '100%',
  },
});
