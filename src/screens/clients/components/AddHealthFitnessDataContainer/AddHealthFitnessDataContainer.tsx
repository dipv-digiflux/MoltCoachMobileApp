import React, { useCallback, useState, type ReactElement } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { CalendarDaysIconSvg } from '@/assets/images';
import {
  DateSelectionBottomSheet,
  DailyActivityBottomSheet,
  PrimaryGoalBottomSheet,
  Input,
  Switch,
} from '@/components';
import { useAppSelector } from '@/store/hooks';
import { colors, iconScale } from '@/theme';

import { AddClientFormValues } from '../../utils/addClientSchema.types';

import { styles } from './AddHealthFitnessDataContainer.styles';
import { AddHealthFitnessDataContainerProps } from './AddHealthFitnessDataContainer.types';

// ─── Internal Sub-components ──────────────────────────────────────────

const SexSelection = ({
  control,
  sexOptions,
  label,
}: {
  control: Control<AddClientFormValues>;
  sexOptions: { label: string; value: string }[];
  label: string;
}): ReactElement => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
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
                style={[styles.chip, isActive ? styles.chipActive : null]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive ? styles.chipTextActive : null,
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
);

const HealthBasicStats = ({
  control,
  errors,
  translation,
}: {
  control: Control<AddClientFormValues>;
  errors: FieldErrors<AddClientFormValues>;
  translation: Record<string, string>;
}): ReactElement => (
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
);

// ─── Main Component ───────────────────────────────────────────────────

export const AddHealthFitnessDataContainer = ({
  control,
  errors,
  showToggle = true,
}: AddHealthFitnessDataContainerProps): React.ReactNode => {
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
    { label: 'High Output', value: 'High Output' },
    { label: 'Get Stronger', value: 'Get Stronger' },
    { label: 'Moderate Activity', value: 'Moderate Activity' },
    { label: 'Sedentary', value: 'Sedentary' },
    { label: 'Lightly Active', value: 'Lightly Active' },
    { label: 'Athlete Mode', value: 'Athlete Mode' },
  ];

  const goalOptions = [
    { label: 'Build Muscle', value: 'Build Muscle' },
    { label: 'Burn Fat', value: 'Burn Fat' },
    { label: 'Performance', value: 'Performance' },
    { label: 'Maintain', value: 'Maintain' },
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
            Fill now to generate the plan instantly, or let them fill it and
            review later.
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

              <SexSelection
                control={control}
                sexOptions={sexOptions}
                label={translation.addHealthFitnessSexLabel}
              />

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

              <HealthBasicStats
                control={control}
                errors={errors}
                translation={translation}
              />

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
