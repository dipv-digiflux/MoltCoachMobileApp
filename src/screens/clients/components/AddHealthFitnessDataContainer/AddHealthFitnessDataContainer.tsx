import React, { useCallback, useState, type ReactElement } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';

import { CalendarDaysIconSvg } from '@/assets/images';
import {
  DateSelectionBottomSheet,
  DailyActivityBottomSheet,
  PrimaryGoalBottomSheet,
  Input,
  Switch,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import {
  colors,
  iconScale,
  moderateScale,
  radius,
  spacing,
  typography,
} from '@/theme';

import { AddHealthFitnessDataContainerProps } from './AddHealthFitnessDataContainer.types';

const FORM_BG = '#F5F7F8';

export const AddHealthFitnessDataContainer = ({
  control,
  errors,
  showToggle = true,
}: AddHealthFitnessDataContainerProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [dateSheetVisible, setDateSheetVisible] = useState(false);
  const [activitySheetVisible, setActivitySheetVisible] = useState(false);
  const [goalSheetVisible, setGoalSheetVisible] = useState(false);

  const sexOptions = [
    { label: translation.sexFemale, value: 'sexFemale' },
    { label: translation.sexMale, value: 'sexMale' },
    { label: translation.sexOther, value: 'sexOther' },
  ];

  const activityOptions = [
    { label: translation.activityNotActive, value: 'activityNotActive' },
    { label: translation.activityLight, value: 'activityLight' },
    { label: translation.activityModerate, value: 'activityModerate' },
    { label: translation.activityVery, value: 'activityVery' },
    { label: translation.activityExtra, value: 'activityExtra' },
  ];

  const goalOptions = [
    { label: translation.goalFatLoss, value: 'goalFatLoss' },
    { label: translation.goalMuscleGain, value: 'goalMuscleGain' },
    { label: translation.goalMaintenance, value: 'goalMaintenance' },
    { label: translation.goalPerformance, value: 'goalPerformance' },
  ];

  const formatIsoToDisplay = useCallback((iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, (m ?? 1) - 1, d);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }, []);

  return (
    <View style={styles.outer}>
      <View style={styles.titleRow}>
        <View style={styles.titleInfo}>
          <Text style={styles.title}>{translation.addHealthFitnessTitle}</Text>
          <Text style={styles.subtitle}>
            {translation.addHealthFitnessSubtitle}
          </Text>
        </View>
        {showToggle ? (
          <Controller
            control={control}
            name="healthEnabled"
            render={({ field: { value, onChange } }) => (
              <Switch on={value} onChange={onChange} size="default" />
            )}
          />
        ) : null}
      </View>

      <Controller
        control={control}
        name="healthEnabled"
        render={({ field: { value: healthEnabled } }) =>
          healthEnabled ? (
            <View style={styles.formContent}>
              <View style={styles.divider} />

              <View style={styles.inputGroup}>
                <Text style={styles.label}>
                  {translation.addHealthFitnessSexLabel}
                </Text>
                <Controller
                  control={control}
                  name="health.sex"
                  render={({ field: { value, onChange } }) => (
                    <View style={styles.chipRow}>
                      {sexOptions.map(option => {
                        const isActive = value === option.value;
                        return (
                          <Pressable
                            key={option.value}
                            onPress={() => onChange(option.value)}
                            style={[styles.chip, isActive && styles.chipActive]}
                          >
                            <Text
                              style={[
                                styles.chipText,
                                isActive && styles.chipTextActive,
                              ]}
                            >
                              {option.label}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  )}
                />
              </View>

              <Controller
                control={control}
                name="health.dob"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      label={translation.addHealthFitnessDobLabel}
                      value={value ? formatIsoToDisplay(value) : ''}
                      placeholder="MM / DD / YYYY"
                      editable={false}
                      containerPress={() => setDateSheetVisible(true)}
                      rightIcon={
                        <CalendarDaysIconSvg
                          width={iconScale(20)}
                          height={iconScale(20)}
                          color={colors.IconCalendarDefault}
                        />
                      }
                      error={!!errors.health?.dob}
                      errorMessage={errors.health?.dob?.message}
                    />
                    <DateSelectionBottomSheet
                      visible={dateSheetVisible}
                      onClose={() => setDateSheetVisible(false)}
                      onDateSelect={iso => {
                        onChange(iso);
                        setDateSheetVisible(false);
                      }}
                      initialSelectedDate={value}
                    />
                  </>
                )}
              />

              <View style={styles.row}>
                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="health.height"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label={translation.addHealthFitnessHeightLabel}
                        value={value}
                        onChangeText={onChange}
                        placeholder="0"
                        keyboardType="number-pad"
                        rightText="cm"
                        inputContainerStyle={styles.rowInputContainer}
                        error={!!errors.health?.height}
                        errorMessage={errors.health?.height?.message}
                      />
                    )}
                  />
                </View>
                <View style={styles.flex1}>
                  <Controller
                    control={control}
                    name="health.weight"
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label={translation.addHealthFitnessWeightLabel}
                        value={value}
                        onChangeText={onChange}
                        placeholder="0"
                        keyboardType="number-pad"
                        rightText="kg"
                        inputContainerStyle={styles.rowInputContainer}
                        error={!!errors.health?.weight}
                        errorMessage={errors.health?.weight?.message}
                      />
                    )}
                  />
                </View>
              </View>

              <Controller
                control={control}
                name="health.activity"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      label={translation.addHealthFitnessActivityLabel}
                      value={
                        activityOptions.find(opt => opt.value === value)
                          ?.label || ''
                      }
                      placeholder="Select activity"
                      editable={false}
                      containerPress={() => setActivitySheetVisible(true)}
                      error={!!errors.health?.activity}
                      errorMessage={errors.health?.activity?.message}
                    />
                    <DailyActivityBottomSheet
                      visible={activitySheetVisible}
                      initialValue={value}
                      onClose={() => setActivitySheetVisible(false)}
                      onSelect={val => {
                        onChange(val);
                        setActivitySheetVisible(false);
                      }}
                    />
                  </>
                )}
              />

              <Controller
                control={control}
                name="health.goal"
                render={({ field: { value, onChange } }) => (
                  <>
                    <Input
                      label={translation.addHealthFitnessGoalLabel}
                      value={
                        goalOptions.find(opt => opt.value === value)?.label ||
                        ''
                      }
                      placeholder="Select goal"
                      editable={false}
                      containerPress={() => setGoalSheetVisible(true)}
                      error={!!errors.health?.goal}
                      errorMessage={errors.health?.goal?.message}
                    />
                    <PrimaryGoalBottomSheet
                      visible={goalSheetVisible}
                      initialValue={value}
                      onClose={() => setGoalSheetVisible(false)}
                      onSelect={val => {
                        onChange(val);
                        setGoalSheetVisible(false);
                      }}
                    />
                  </>
                )}
              />

              <Controller
                control={control}
                name="health.conditions"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={translation.addHealthFitnessConditionsLabel}
                    value={value}
                    onChangeText={onChange}
                    placeholder="None"
                    multiline
                    inputContainerStyle={styles.conditionsInput}
                    error={!!errors.health?.conditions}
                    errorMessage={errors.health?.conditions?.message}
                  />
                )}
              />
            </View>
          ) : (
            <></>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    padding: spacing['Spacing-4xl'],
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleInfo: {
    flex: 1,
    marginRight: spacing['Spacing-xl'],
    gap: spacing['Spacing-1'],
  },
  title: {
    ...typography.bodySmall1TallSemiBold,
    color: colors.TextPrimaryStrong,
  },
  subtitle: {
    ...typography.bodySmall4Regular,
    color: colors.IconTertiarySubtle,
  },
  formContent: {
    marginTop: spacing['Spacing-4xl'],
    gap: spacing['Spacing-6xl'],
  },
  divider: {
    height: 1,
    backgroundColor: colors.DividerSubtleOverlay,
    borderStyle: 'dotted',
    borderRadius: 1,
    marginBottom: spacing['Spacing-2xl'],
  },
  inputGroup: {
    gap: spacing['Spacing-xl'],
  },
  label: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryStrong,
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-3xl'],
  },
  chip: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    paddingHorizontal: spacing['Spacing-3xl'],
    borderRadius: radius.xs,
    backgroundColor: colors.StatesWhite,
    borderWidth: 1,
    borderColor: colors.BorderPrimaryDefault,
    alignItems: 'center',
  },
  chipActive: {
    backgroundColor: colors.StatesFill2,
    borderColor: colors.TextPrimaryDefault,
  },
  chipText: {
    ...typography.bodySmall1SemiBold,
    color: colors.IconTertiarySubtle,
  },
  chipTextActive: {
    color: colors.TextPrimaryStrong,
  },
  row: {
    flexDirection: 'row',
    gap: spacing['Spacing-4xl'],
  },
  flex1: {
    flex: 1,
  },
  rowInputContainer: {
    backgroundColor: FORM_BG,
    borderWidth: 0,
  },
  conditionsInput: {
    minHeight: moderateScale(80),
    alignItems: 'flex-start',
  },
});
