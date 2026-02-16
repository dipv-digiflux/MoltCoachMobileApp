import React, { type ReactElement } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, PageHeaderScrollView, ProgressStepper } from '@/components';
import { colors, spacing, typography, moderateScale } from '@/theme';

import type { OnboardingNavigationProp } from '@navigation/types';

export const ConnectHealthScreen = (): ReactElement => {
  const navigation = useNavigation<OnboardingNavigationProp>();

  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: '' }}
        contentContainerStyle={styles.contentContainerStyle}
        headerChildren={<ProgressStepper currentStep={2} totalSteps={2} />}
      >
        <View style={styles.content}>
          <View style={styles.headingBlock}>
            <Text style={styles.title}>Connect your health app</Text>
            <Text style={styles.description}>
              Sync your daily steps, workouts, and energy data to get
              personalized insights and accurate progress tracking.
            </Text>
          </View>

          <Button
            label="Next: Plan preview"
            variant="primary"
            size="large"
            onPress={() => navigation.navigate('PlanPreview')}
            style={styles.primaryButton}
          />
        </View>
      </PageHeaderScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  contentContainerStyle: {
    flexGrow: 1,
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
  // Slightly lighter active for the second step, matching Figma feel
  progressSegmentActiveSecondary: {
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
    marginBottom: spacing['Spacing-11xl'],
  },
  primaryButton: {
    width: '100%',
  },
});
