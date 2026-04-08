import React, { ReactElement, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomSheet, Input, RecentActivityCard } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { borderWidth, colors, radius, spacing } from '@/theme';

import type { AdjustActivityTargetsBottomSheetProps } from './AdjustActivityTargetsBottomSheet.types';

export const AdjustActivityTargetsBottomSheet = ({
  visible,
  onClose,
  initialValues,
  recentActivities,
  onSave,
}: AdjustActivityTargetsBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);

  const [dailySteps, setDailySteps] = useState(initialValues?.dailySteps ?? '');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(
    initialValues?.workoutsPerWeek ?? '',
  );
  const [waterIntake, setWaterIntake] = useState(
    initialValues?.waterIntake ?? '',
  );
  const [sleepTarget, setSleepTarget] = useState(
    initialValues?.sleepTarget ?? '',
  );

  useEffect(() => {
    if (visible) {
      setDailySteps(initialValues?.dailySteps ?? '');
      setWorkoutsPerWeek(initialValues?.workoutsPerWeek ?? '');
      setWaterIntake(initialValues?.waterIntake ?? '');
      setSleepTarget(initialValues?.sleepTarget ?? '');
    }
  }, [visible, initialValues]);

  const handleSave = useCallback(() => {
    onSave?.({
      dailySteps,
      workoutsPerWeek,
      waterIntake,
      sleepTarget,
    });
  }, [dailySteps, workoutsPerWeek, waterIntake, sleepTarget, onSave]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: translation.adjustActivityTargetsHeaderTitle,
      }}
      footer={{
        primaryLabel: translation.adjustActivityTargetsSaveChanges,
        onPrimaryPress: handleSave,
      }}
    >
      <View style={styles.formContainer}>
        <View style={styles.fieldsRow}>
          <View style={styles.fieldWrap}>
            <Input
              label={translation.adjustActivityTargetsDailySteps}
              value={dailySteps}
              onChangeText={setDailySteps}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.fieldWrap}>
            <Input
              label={translation.adjustActivityTargetsWorkoutsWeek}
              value={workoutsPerWeek}
              onChangeText={setWorkoutsPerWeek}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.fieldsRow}>
          <View style={styles.fieldWrap}>
            <Input
              label={translation.adjustActivityTargetsWaterIntake}
              value={waterIntake}
              onChangeText={setWaterIntake}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.fieldWrap}>
            <Input
              label={translation.adjustActivityTargetsSleepTarget}
              value={sleepTarget}
              onChangeText={setSleepTarget}
            />
          </View>
        </View>
      </View>

      {recentActivities && recentActivities.length > 0 && (
        <RecentActivityCard
          activities={recentActivities}
          title={translation.adjustActivityTargetsRecentActivityTitle}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: spacing['Spacing-10xl'],
    paddingBottom: spacing['Spacing-xl'],
    borderWidth: borderWidth.hairline,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    padding: spacing['Spacing-4xl'],
    backgroundColor: colors.StatesWhite,
  },
  fieldsRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-xl'],
  },
  fieldWrap: {
    flex: 1,
  },
});
