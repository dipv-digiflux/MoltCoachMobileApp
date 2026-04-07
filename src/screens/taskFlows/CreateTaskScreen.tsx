import React, { useEffect, useMemo, type ReactElement } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, useForm } from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  CalendarDaysIconSvg,
  NotificationBellSvg,
  VectorIconSvg,
} from '@/assets/images';
import {
  Button,
  LiquidFooter,
  PageHeader,
  Switch,
  TextArea,
  TimeWheelPicker,
  MonthlyDateSelectionBottomSheet,
  TimeSelectionBottomSheet,
} from '@/components';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { resetClientOperation } from '@/store/slices/clientSlice';
import { RootState } from '@/store/store';
import { createTaskThunk, updateTaskThunk } from '@/store/thunks/clientThunks';
import { moderateScale, spacing } from '@/theme';
import { CreateTaskPayload } from '@/types/api.types';
import { AppStackParamList } from '@/types/navigation.types';

import { getStyles } from './CreateTaskScreen.styles';
import {
  CreateTaskSchema,
  type CreateTaskFormValues,
  SUGGESTIONS,
  DAYS,
  TASK_TYPES,
  FREQUENCIES,
  DAY_MAPPING,
  INVERSE_DAY_MAPPING,
} from './CreateTaskScreen.types';

export const CreateTaskScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, 'CreateTask'>): ReactElement => {
  const navigation =
    useNavigation<NativeStackScreenProps<AppStackParamList>['navigation']>();
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();
  const _clientName = route.params?.clientName || 'Client';
  const clientId = route.params?.clientId || '';

  const { operations } = useAppSelector((state: RootState) => state.client);
  const task = route.params?.task;
  const isEditing = !!task;
  const isPending =
    operations.createTask.status === 'loading' ||
    operations.updateTask.status === 'loading';

  const [isMonthlySheetVisible, setIsMonthlySheetVisible] =
    React.useState(false);
  const [isTimeSheetVisible, setIsTimeSheetVisible] = React.useState(false);

  const styles = useMemo(() => getStyles(), []);

  useEffect(() => {
    return () => {
      dispatch(resetClientOperation('createTask'));
      dispatch(resetClientOperation('updateTask'));
    };
  }, [dispatch]);

  // Initial values based on task if editing
  const getInitialValues = (): CreateTaskFormValues => {
    if (!task) {
      return {
        taskName: '',
        taskType: 'Repeat task',
        frequency: 'Daily',
        selectedDays: [],
        monthlyDay: '14th Apr 2026',
        quarterlyDate: '31st Mar 2026',
        oneTimeDate: '31st Mar 2026',
        reminderEnabled: true,
        reminderTime: '06:28 PM',
      };
    }

    const freq = (task.frequency.charAt(0).toUpperCase() +
      task.frequency.slice(1)) as CreateTaskFormValues['frequency'];

    // Map schedule values
    let monthlyDay = '14th Apr 2026';
    if (task.frequency === 'monthly' && task.schedule?.day_of_month) {
      monthlyDay = `${task.schedule.day_of_month}th of every month`;
    }

    let quarterlyDate = '31st Mar 2026';
    if (task.frequency === 'quarterly' && task.schedule?.day_of_month) {
      quarterlyDate = `${task.schedule.day_of_month}th of quarter`;
    }

    let oneTimeDate = '31st Mar 2026';
    if (task.task_type === 'one-time' && task.schedule?.date) {
      oneTimeDate = task.schedule.date;
    }

    return {
      taskName: task.task,
      taskType: task.task_type === 'repeat' ? 'Repeat task' : 'One-time task',
      frequency: freq,
      selectedDays: (task.schedule?.days_of_week || []).map(
        d => INVERSE_DAY_MAPPING[d] || d,
      ),
      monthlyDay,
      quarterlyDate,
      oneTimeDate,
      reminderEnabled: task.is_reminder || false,
      reminderTime: task.reminder_time || '06:28 PM',
    };
  };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: getInitialValues(),
  });

  // Re-initialize if task changes
  useEffect(() => {
    if (task) {
      reset(getInitialValues());
    }
  }, [task, reset]);

  const taskType = watch('taskType');
  const frequency = watch('frequency');
  const reminderEnabled = watch('reminderEnabled');
  const selectedDays = watch('selectedDays');

  const onSubmit = async (data: CreateTaskFormValues): Promise<void> => {
    if (!clientId) {
      console.error('Client ID is missing');
      return;
    }

    const payload: CreateTaskPayload = {
      start_date: task?.start_date || new Date().toISOString().split('T')[0],
      end_date: task?.end_date || '2099-12-31',
      task: data.taskName,
      customer_id: clientId,
      task_type: data.taskType === 'Repeat task' ? 'repeat' : 'one-time',
      frequency: data.frequency.toLowerCase() as CreateTaskPayload['frequency'],
      schedule: {},
      is_reminder: data.reminderEnabled,
      reminder_time: data.reminderTime,
    };

    if (data.taskType === 'One-time task') {
      payload.schedule = {
        date: data.oneTimeDate,
      };
    } else if (data.frequency === 'Weekly') {
      payload.schedule = {
        days_of_week: data.selectedDays.map(
          d => DAY_MAPPING[d] || d.toLowerCase(),
        ),
      };
    } else if (data.frequency === 'Monthly') {
      const dayStr = data.monthlyDay || '';
      const day = parseInt(dayStr.split(' ')[0], 10);
      payload.schedule = {
        day_of_month: isNaN(day) ? 14 : day,
      };
    } else if (data.frequency === 'Quarterly') {
      const dayStr = data.quarterlyDate || '';
      const day = parseInt(dayStr.split(' ')[0], 10);
      payload.schedule = {
        quarters: [1, 2, 3, 4],
        day_of_month: isNaN(day) ? 14 : day,
      };
    }

    try {
      let response;
      if (task?._id) {
        response = await dispatch(updateTaskThunk(task._id, payload));
      } else {
        response = await dispatch(createTaskThunk(payload));
      }

      if (response && response.status) {
        setTimeout(() => {
          navigation.goBack();
        }, 100);
      }
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const toggleDay = (
    day: string,
    currentDays: string[],
    onChange: (value: string[]) => void,
  ): void => {
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    onChange(newDays);
  };

  return (
    <View style={styles.container}>
      <PageHeader
        title={isEditing ? 'Edit task' : 'Create task'}
        onPressBack={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing['Spacing-16xl'] },
        ]}
      >
        {/* Task Input Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Task</Text>
          <Controller
            control={control}
            name="taskName"
            render={({ field: { onChange, value } }) => (
              <TextArea
                placeholder="e.g., Morning Mobility"
                value={value}
                onChangeText={onChange}
                style={styles.textArea}
                error={!!errors.taskName}
                errorMessage={errors.taskName?.message}
              />
            )}
          />
          <View style={styles.suggestions}>
            {SUGGESTIONS.map(suggestion => (
              <Pressable
                key={suggestion}
                onPress={() => setValue('taskName', suggestion)}
                style={styles.suggestionPill}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Task Type Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Task Type</Text>
          <View style={styles.typeToggle}>
            {TASK_TYPES.map(type => (
              <Pressable
                key={type}
                onPress={() => setValue('taskType', type)}
                style={[
                  styles.typeButton,
                  taskType === type && styles.typeButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    taskType === type && styles.typeButtonTextActive,
                  ]}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
          {taskType === 'One-time task' && (
            <View style={styles.oneTimeDateContainer}>
              <Pressable style={styles.frequencyInputBox}>
                <Text style={styles.frequencyInputText}>
                  {watch('oneTimeDate')}
                </Text>
                <CalendarDaysIconSvg
                  width={moderateScale(18)}
                  height={moderateScale(18)}
                />
              </Pressable>
              <Text style={styles.oneTimeHelperText}>
                This task is valid only on {watch('oneTimeDate')}
              </Text>
            </View>
          )}
        </View>

        {/* Frequency Section */}
        {taskType === 'Repeat task' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Frequency</Text>
            <View style={styles.frequencyTabs}>
              {FREQUENCIES.map(freq => (
                <Pressable
                  key={freq}
                  onPress={() => setValue('frequency', freq)}
                  style={[
                    styles.freqButton,
                    frequency === freq && styles.freqButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.freqButtonText,
                      frequency === freq && styles.freqButtonTextActive,
                    ]}
                  >
                    {freq}
                  </Text>
                </Pressable>
              ))}
            </View>

            {frequency === 'Weekly' && (
              <View style={styles.weeklyDaysSection}>
                <Controller
                  control={control}
                  name="selectedDays"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.daySelectorRow}>
                      {DAYS.map(day => {
                        const isSelected = value.includes(day.value);
                        return (
                          <TouchableOpacity
                            key={day.value}
                            onPress={() =>
                              toggleDay(day.value, value, onChange)
                            }
                            style={[
                              styles.dayBubble,
                              isSelected && styles.dayBubbleSelected,
                              errors.selectedDays && styles.dayBubbleError,
                            ]}
                          >
                            <Text
                              style={[
                                styles.dayLabel,
                                isSelected && styles.dayLabelSelected,
                              ]}
                            >
                              {day.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                />
                {errors.selectedDays && (
                  <Text style={styles.errorText}>
                    {errors.selectedDays.message}
                  </Text>
                )}
                {selectedDays.length > 0 && (
                  <Text style={styles.repeatSummaryText}>
                    Repeat:{' '}
                    <Text style={styles.repeatSummaryDays}>
                      Every {selectedDays.join(', ')}
                    </Text>
                  </Text>
                )}
              </View>
            )}

            {frequency === 'Monthly' && (
              <View style={styles.frequencyInputWrapper}>
                <Pressable
                  style={styles.frequencyInputBox}
                  onPress={() => setIsMonthlySheetVisible(true)}
                >
                  <Text style={styles.frequencyInputText}>
                    {watch('monthlyDay')}
                  </Text>
                  <CalendarDaysIconSvg
                    width={moderateScale(18)}
                    height={moderateScale(18)}
                  />
                </Pressable>
              </View>
            )}

            {frequency === 'Quarterly' && (
              <View style={styles.frequencyInputWrapper}>
                <Pressable
                  style={styles.frequencyInputBox}
                  onPress={() => setIsMonthlySheetVisible(true)}
                >
                  <Text style={styles.frequencyInputText}>
                    {watch('quarterlyDate')}
                  </Text>
                  <CalendarDaysIconSvg
                    width={moderateScale(18)}
                    height={moderateScale(18)}
                  />
                </Pressable>
                <Text style={styles.repeatSummaryText}>
                  Repeat:{' '}
                  <Text style={styles.repeatSummaryDays}>
                    30th June, 30th Sep, 31st Dec
                  </Text>
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Reminder Section */}
        <View style={[styles.card, styles.reminderCard]}>
          <View style={styles.reminderHeader}>
            <View>
              <Text style={styles.cardTitle}>Reminder</Text>
              <Text style={styles.cardSubtitle}>
                Get notified at a specific time
              </Text>
            </View>
            <Controller
              control={control}
              name="reminderEnabled"
              render={({ field: { onChange, value } }) => (
                <Switch on={value} onChange={onChange} />
              )}
            />
          </View>
          {reminderEnabled && (
            <Pressable
              style={styles.timePickerContainer}
              onPress={() => setIsTimeSheetVisible(true)}
            >
              <TimeWheelPicker
                value={watch('reminderTime')}
                onChange={() => {}}
              />
              <View style={styles.absoluteFill} pointerEvents="none" />
            </Pressable>
          )}
        </View>

        {/* Summary Section */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryItem}>
            <VectorIconSvg width={18} height={18} />
            <Text style={styles.summaryText}>
              {taskType === 'Repeat task'
                ? `Repeats ${frequency}${
                    frequency === 'Weekly' && selectedDays.length > 0
                      ? ` on ${selectedDays.join(', ')}`
                      : frequency === 'Monthly'
                      ? ` on ${watch('monthlyDay')}`
                      : frequency === 'Quarterly'
                      ? ` on ${watch('quarterlyDate')}`
                      : ''
                  }`
                : `One-time task on ${watch('oneTimeDate')}`}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <NotificationBellSvg width={18} height={18} />
            <Text style={styles.summaryText}>
              {reminderEnabled
                ? `Reminder at ${watch('reminderTime')}`
                : 'No reminder set'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <CalendarDaysIconSvg width={18} height={18} />
            <Text style={styles.summaryText}>Starts Today</Text>
          </View>
        </View>
      </ScrollView>

      <MonthlyDateSelectionBottomSheet
        visible={isMonthlySheetVisible}
        onClose={() => setIsMonthlySheetVisible(false)}
        onSelect={({ month, day, year }) => {
          const formatted = `${day} ${month} ${year}`;
          if (frequency === 'Monthly') {
            setValue('monthlyDay', formatted);
          } else {
            setValue('quarterlyDate', formatted);
          }
        }}
        title={`Select ${frequency.toLowerCase()} date`}
      />

      <TimeSelectionBottomSheet
        visible={isTimeSheetVisible}
        onClose={() => setIsTimeSheetVisible(false)}
        initialValue={watch('reminderTime')}
        onSelect={time => setValue('reminderTime', time)}
      />

      <LiquidFooter showTopBorder>
        <Button
          label={isEditing ? 'Update Task' : 'Create Task'}
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          variant="primary"
          size="large"
          loading={isPending}
          fullWidth
        />
      </LiquidFooter>
    </View>
  );
};
