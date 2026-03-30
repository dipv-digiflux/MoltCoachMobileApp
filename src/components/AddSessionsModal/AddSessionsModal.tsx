import React, { type ReactElement } from 'react';
import { View, Pressable } from 'react-native';
import { Controller } from 'react-hook-form';
import Svg, { Path, Rect } from 'react-native-svg';

import {
  Input,
  FilterTabs,
  DateSelectionBottomSheet,
  BottomSheet,
} from '@/components';
import { colors, moderateScale } from '@/theme';
import { AddSessionsModalProps } from '@/types/components.types';

import styles from './AddSessionsModal.styles';
import { formatDateLabel } from './AddSessionsModal.utils';
import { useAddSessions } from './hooks/useAddSessions';

const CalendarIcon = (): React.ReactElement => (
  <Svg
    width={moderateScale(20)}
    height={moderateScale(20)}
    viewBox="0 0 24 24"
    fill="none"
  >
    <Rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      stroke={colors.TextPrimaryDefault}
      strokeWidth="2"
    />
    <Path
      d="M3 10H21M16 2V6M8 2V6"
      stroke={colors.TextPrimaryDefault}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export const AddSessionsModal = (
  props: AddSessionsModalProps,
): ReactElement => {
  const {
    isDatePickerVisible,
    setIsDatePickerVisible,
    control,
    handleSubmit,
    mode,
    setValue,
    errors,
    handleUpdate,
    watch,
  } = useAddSessions(props);

  const { visible, onClose, clientName } = props;

  return (
    <>
      <BottomSheet
        visible={visible}
        onClose={onClose}
        header={{
          title: clientName,
          subtitle: 'Add sessions',
        }}
        footer={{
          primaryLabel: 'Update',
          onPrimaryPress: () => {
            void handleSubmit(handleUpdate)();
          },
        }}
      >
        <View style={styles.tabsContainer}>
          <Controller
            control={control}
            name="mode"
            render={({ field: { value, onChange } }) => (
              <FilterTabs
                variant="outlined"
                tabs={['Online', 'Physical (In-person)']}
                activeTab={value}
                onTabChange={t =>
                  onChange(t as 'Online' | 'Physical (In-person)')
                }
                style={styles.tabs}
              />
            )}
          />
        </View>

        <View style={styles.formContainer}>
          {mode === 'Online' ? (
            <View style={styles.fieldsRow}>
              <View style={styles.fieldWrap}>
                <Controller
                  control={control}
                  name="months"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label="Number of months"
                      placeholder="e.g. 4"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      error={!!errors.months}
                      errorMessage={errors.months?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.fieldWrap}>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field: { value } }) => (
                    <Pressable onPress={() => setIsDatePickerVisible(true)}>
                      <View pointerEvents="none">
                        <Input
                          label="Start Date"
                          placeholder="DD MMM YYYY"
                          value={formatDateLabel(value)}
                          error={!!errors.startDate}
                          errorMessage={errors.startDate?.message}
                          rightIcon={<CalendarIcon />}
                        />
                      </View>
                    </Pressable>
                  )}
                />
              </View>
            </View>
          ) : (
            <View style={styles.fieldsRow}>
              <View style={styles.fieldWrap}>
                <Controller
                  control={control}
                  name="totalSessions"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label="Total Sessions"
                      placeholder="e.g. 24"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      error={!!errors.totalSessions}
                      errorMessage={errors.totalSessions?.message}
                    />
                  )}
                />
              </View>
              <View style={styles.fieldWrap}>
                <Controller
                  control={control}
                  name="sessionsLeft"
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label="Sessions Left"
                      placeholder="e.g. 20"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      error={!!errors.sessionsLeft}
                      errorMessage={errors.sessionsLeft?.message}
                    />
                  )}
                />
              </View>
            </View>
          )}
        </View>
      </BottomSheet>

      <DateSelectionBottomSheet
        visible={isDatePickerVisible}
        onClose={() => setIsDatePickerVisible(false)}
        onDateSelect={date => {
          setValue('startDate', date, { shouldValidate: true });
          setIsDatePickerVisible(false);
        }}
        initialSelectedDate={watch('startDate')}
      />
    </>
  );
};
