import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

const HOW_TO_START_STEPS = [
  {
    id: 1,
    title: 'Invite your clients to Molt',
    description: 'Share your referral link from the Clients tab.',
  },
  {
    id: 2,
    title: 'Clients subscribe to Molt meals',
    description: 'You earn credits every time they purchase or renew.',
  },
  {
    id: 3,
    title: 'Redeem or withdraw',
    description: 'Convert credits to AED or transfer them to your clients.',
  },
] as const;

export const HowToStartEarning = (): ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How to start earning</Text>

      <View style={styles.stepsContainer}>
        {HOW_TO_START_STEPS.map(step => (
          <View key={step.id} style={styles.stepBox}>
            <View style={styles.numberContainer}>
              <Text style={styles.numberText}>{step.id}</Text>
            </View>

            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDescription}>{step.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Main container with 16px vertical gap between heading and list
  container: {
    gap: spacing['Spacing-5xl'], // spacingScale(16)
  },
  heading: {
    ...typography.b1SemiBold, // fontScale(16), lineHeightScale(20), 'Inter-SemiBold'
    color: colors.TextPrimaryActive, // '#0F1720'
  },
  // Second container: vertical stack of boxes
  stepsContainer: {
    gap: spacing['Spacing-1'], // spacingScale(1)
  },
  // Individual step box
  stepBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: radius.sm, // moderateScale(4)
    borderWidth: 1,
    borderColor: colors.BorderSecondaryDefault, // '#CBD5E1'
    backgroundColor: colors.StatesWhite, // '#FFFFFF'
    paddingTop: spacing['Spacing-3xl'], // spacingScale(12)
    paddingRight: spacing['Spacing-3xl'], // spacingScale(12)
    paddingBottom: spacing['Spacing-3xl'], // spacingScale(12)
    paddingLeft: spacing['Spacing-11xl'], // spacingScale(32)
    gap: spacing['Spacing-m'], // spacingScale(4)
  },
  // Number-only container
  numberContainer: {
    position: 'absolute',
    left: spacing['Spacing-3xl'], // spacingScale(12)
    top: spacing['Spacing-3xl'], // spacingScale(12)
  },
  numberText: {
    ...typography.bodySmall2SemiBold, // fontScale(12), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.IconTertiarySubtle, // '#919191'
  },
  // Text container (heading + secondary text)
  stepTextContainer: {
    flex: 1,
    gap: spacing['Spacing-m'], // spacingScale(4)
  },
  stepTitle: {
    ...typography.bodySmall1SemiBold, // fontScale(14), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.TextPrimaryStrong, // '#0F1720'
  },
  stepDescription: {
    ...typography.bodySmall4Regular, // fontScale(), lineHeightScale(12), 'Inter-Regular'
    color: colors.IconTertiarySubtle, // '#919191'
  },
});
