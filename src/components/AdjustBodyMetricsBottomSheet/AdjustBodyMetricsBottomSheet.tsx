import React, { type ReactElement } from 'react';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';

import { Input, BottomSheet, RecentActivityCard } from '@/components';

import styles from './AdjustBodyMetricsBottomSheet.styles';
import { AdjustBodyMetricsBottomSheetProps } from './AdjustBodyMetricsBottomSheet.types';
import { useAdjustBodyMetrics } from './hooks/useAdjustBodyMetrics';

export const AdjustBodyMetricsBottomSheet = (
  props: AdjustBodyMetricsBottomSheetProps,
): ReactElement => {
  const { control, handleSubmit, errors, handleUpdate } =
    useAdjustBodyMetrics(props);

  const { visible, onClose, recentActivity } = props;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: 'Adjust Body Metrics',
      }}
      footer={{
        primaryLabel: 'Save Changes',
        onPrimaryPress: () => {
          void handleSubmit(handleUpdate)();
        },
      }}
    >
      <View style={styles.formContainer}>
        <View style={styles.fieldsRow}>
          <View style={styles.fieldWrap}>
            <Controller
              control={control}
              name="height"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Height"
                  placeholder="e.g. 168"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  error={!!errors.height}
                  errorMessage={errors.height?.message}
                  rightIcon={<Text style={styles.suffixText}>cm</Text>}
                />
              )}
            />
          </View>
          <View style={styles.fieldWrap}>
            <Controller
              control={control}
              name="bodyFat"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Body Fat"
                  placeholder="e.g. 28"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  error={!!errors.bodyFat}
                  errorMessage={errors.bodyFat?.message}
                  rightIcon={<Text style={styles.suffixText}>%</Text>}
                />
              )}
            />
          </View>
        </View>

        <View style={styles.fieldsRow}>
          <View style={styles.fieldWrap}>
            <Controller
              control={control}
              name="muscleMass"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Muscle Mass"
                  placeholder="e.g. 45"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  error={!!errors.muscleMass}
                  errorMessage={errors.muscleMass?.message}
                  rightIcon={<Text style={styles.suffixText}>kg</Text>}
                />
              )}
            />
          </View>
          <View style={styles.fieldWrap}>
            <Controller
              control={control}
              name="restingHR"
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Resting HR"
                  placeholder="e.g. 62"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  error={!!errors.restingHR}
                  errorMessage={errors.restingHR?.message}
                  rightIcon={<Text style={styles.suffixText}>bpm</Text>}
                />
              )}
            />
          </View>
        </View>
      </View>

      {recentActivity && recentActivity.length > 0 && (
        <RecentActivityCard
          activities={recentActivity}
          title="Recent activity"
        />
      )}
    </BottomSheet>
  );
};
