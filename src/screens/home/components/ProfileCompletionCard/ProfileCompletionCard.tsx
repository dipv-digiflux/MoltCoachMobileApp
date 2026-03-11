import React, { type ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, radius, spacing, typography } from '@/theme';

const PROGRESS_VALUE = 0.25; // 1 of 4 steps done, 3 left

export const ProfileCompletionCard = (): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  return (
    <View style={styles.container}>
      <View style={styles.textBlock}>
        <Text style={styles.title}>{translation.profileCompleteTitle}</Text>
        <Text style={styles.description}>
          {translation.profileCompleteDescription}
        </Text>
      </View>
      <View style={styles.progressBlock}>
        <View style={styles.progressLabels}>
          <Text style={styles.stepsLeft}>
            {translation.profileCompleteStepsLeft}
          </Text>
          <Text style={styles.earnCredits}>
            {translation.profileCompleteEarnCredits}
          </Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${PROGRESS_VALUE * 100}%` },
            ]}
          />
        </View>
      </View>
      <Button
        label={translation.profileCompleteButton}
        variant="primary"
        size="large"
        onPress={() => {}}
        accessibilityLabel={translation.profileCompleteButton}
        fullWidth={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.StatesFill2, // '#FDFDFD'
    borderWidth: 1,
    borderColor: colors.StatesOutline, // '#EBEBEB'
    borderRadius: Number(radius.xs), // moderateScale(2)
    padding: spacing['Spacing-3xl'], // spacingScale(12)
    gap: spacing['Spacing-10xl'], // spacingScale(24)
  },
  textBlock: {
    gap: spacing['Spacing-m'], // spacingScale(4)
  },
  title: {
    ...typography.bodySmall1SemiBold, // fontScale(14), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.PrimaryMain, // '#101610'
  },
  description: {
    ...typography.bodySmall2Regular, // fontScale(12), lineHeightScale(16), 'Inter-Regular'
    color: colors.PrimaryMain, // '#101610'
  },

  progressBlock: {
    gap: spacing['Spacing-xl'], // spacingScale(4)
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepsLeft: {
    ...typography.bodySmall2SemiBold, // fontScale(12), lineHeightScale(16), 'Inter-SemiBold'
    color: colors.PrimaryMain, // '#101610'
  },
  earnCredits: {
    ...typography.bodySmall2Regular, // fontScale(12), lineHeightScale(16), 'Inter-Regular'
    color: colors.PrimaryMain, // '#101610'
  },
  progressBarTrack: {
    height: spacing['Spacing-m'], // spacingScale(4)
    borderRadius: radius.pill, // moderateScale(38)
    backgroundColor: colors.StatesFill1, // '#F5F6F5'
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: radius.pill, // moderateScale(38)
    backgroundColor: colors.PrimaryMain, // '#101610'
  },
  buttonFullWidth: {
    alignSelf: 'stretch',
  },
});
