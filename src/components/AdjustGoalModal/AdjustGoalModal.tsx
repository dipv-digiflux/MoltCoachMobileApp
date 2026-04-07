import React, { type ReactElement } from 'react';
import { View, Pressable, Text } from 'react-native';
import { Controller } from 'react-hook-form';

import { ArrowDownIconSvg } from '@/assets/images';
import {
  Input,
  BottomSheet,
  RecentActivityCard,
  PrimaryGoalBottomSheet,
} from '@/components';
import { moderateScale } from '@/theme';

import styles from './AdjustGoalModal.styles';
import { AdjustGoalModalProps } from './AdjustGoalModal.types';
import { useAdjustGoal } from './hooks/useAdjustGoal';

export const AdjustGoalModal = (props: AdjustGoalModalProps): ReactElement => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    errors,
    handleUpdate,
    isGoalPickerVisible,
    setIsGoalPickerVisible,
  } = useAdjustGoal(props);

  const { visible, onClose, recentActivity } = props;

  const currentGoal = watch('primaryGoal');

  return (
    <>
      <BottomSheet
        visible={visible}
        onClose={onClose}
        header={{
          title: 'Adjust Goal & Progress',
        }}
        footer={{
          primaryLabel: 'Save Changes',
          onPrimaryPress: () => {
            void handleSubmit(handleUpdate)();
          },
        }}
      >
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="primaryGoal"
            render={({ field: { value } }) => (
              <Pressable onPress={() => setIsGoalPickerVisible(true)}>
                <View pointerEvents="none">
                  <Input
                    label="Primary Goal"
                    placeholder="Select goal"
                    value={value}
                    error={!!errors.primaryGoal}
                    errorMessage={errors.primaryGoal?.message}
                    rightIcon={
                      <View style={styles.rightIconContainer}>
                        <ArrowDownIconSvg
                          width={moderateScale(12)}
                          height={moderateScale(7)}
                        />
                      </View>
                    }
                  />
                </View>
              </Pressable>
            )}
          />

          <Controller
            control={control}
            name="timeline"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Target Timeline"
                placeholder="e.g. 12"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                error={!!errors.timeline}
                errorMessage={errors.timeline?.message}
                rightIcon={<Text style={styles.suffixText}>Weeks</Text>}
              />
            )}
          />

          <View style={styles.fieldsRow}>
            <View style={styles.fieldWrap}>
              <Controller
                control={control}
                name="startingWeight"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Starting Weight"
                    placeholder="e.g. 75.0"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    error={!!errors.startingWeight}
                    errorMessage={errors.startingWeight?.message}
                    rightIcon={<Text style={styles.suffixText}>kg</Text>}
                  />
                )}
              />
            </View>
            <View style={styles.fieldWrap}>
              <Controller
                control={control}
                name="currentWeight"
                render={({ field: { value, onChange } }) => (
                  <Input
                    label="Current Weight"
                    placeholder="e.g. 71.5"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    error={!!errors.currentWeight}
                    errorMessage={errors.currentWeight?.message}
                    rightIcon={<Text style={styles.suffixText}>kg</Text>}
                  />
                )}
              />
            </View>
          </View>
        </View>

        {recentActivity && recentActivity.length > 0 && (
          <RecentActivityCard activities={recentActivity} />
        )}
      </BottomSheet>

      <PrimaryGoalBottomSheet
        visible={isGoalPickerVisible}
        onClose={() => setIsGoalPickerVisible(false)}
        initialValue={currentGoal}
        onSelect={goal => {
          setValue('primaryGoal', goal, { shouldValidate: true });
          setIsGoalPickerVisible(false);
        }}
      />
    </>
  );
};
