import React, { type ReactElement } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
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
} from '@/components';
import { colors, moderateScale, spacing, typography } from '@/theme';
import { AppStackParamList } from '@/types/navigation.types';

import {
  CreateTaskSchema,
  type CreateTaskFormValues,
  SUGGESTIONS,
  DAYS,
  TASK_TYPES,
  FREQUENCIES,
} from './CreateTaskScreen.types';

export const CreateTaskScreen = ({
  route,
}: NativeStackScreenProps<AppStackParamList, 'CreateTask'>): ReactElement => {
  const navigation =
    useNavigation<NativeStackScreenProps<AppStackParamList>['navigation']>();
  const insets = useSafeAreaInsets();
  const _clientName = route.params?.clientName || 'Client';

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      taskName: '',
      taskType: 'Repeat task',
      frequency: 'Daily',
      selectedDays: [],
      reminderEnabled: true,
      reminderTime: '06:28 PM',
    },
  });

  const taskType = watch('taskType');
  const frequency = watch('frequency');
  const reminderEnabled = watch('reminderEnabled');
  const selectedDays = watch('selectedDays');

  const onSubmit = (data: CreateTaskFormValues): void => {
    console.log('Task Created:', data);
    navigation.goBack();
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
      <PageHeader title="Create task" onPressBack={() => navigation.goBack()} />

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
            <View style={styles.timePickerContainer}>
              {/* Top Row - Faded */}
              <View style={styles.timeRow}>
                <Text style={styles.timeTextFaded}>06</Text>
                <Text style={styles.timeTextFaded}>28</Text>
                <View style={styles.periodPlaceholder} />
              </View>

              {/* Middle Row - Active */}
              <View style={[styles.timeRow, styles.timeRowActive]}>
                <Text style={styles.timeTextActive}>06</Text>
                <Text style={styles.timeTextActive}>28</Text>
                <Text style={styles.timeTextActive}>PM</Text>
              </View>

              {/* Bottom Row - Faded */}
              <View style={styles.timeRow}>
                <Text style={styles.timeTextFaded}>06</Text>
                <Text style={styles.timeTextFaded}>28</Text>
                <Text style={styles.timeTextFaded}>AM</Text>
              </View>
            </View>
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
                      : ''
                  }`
                : 'One-time task'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <NotificationBellSvg width={18} height={18} />
            <Text style={styles.summaryText}>
              {reminderEnabled ? 'Reminder at 8:00 AM' : 'No reminder set'}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <CalendarDaysIconSvg width={18} height={18} />
            <Text style={styles.summaryText}>Starts Today</Text>
          </View>
        </View>
      </ScrollView>

      <LiquidFooter showTopBorder>
        <Button
          label="Create Task"
          onPress={() => {
            void handleSubmit(onSubmit)();
          }}
          variant="primary"
          size="large"
          fullWidth
        />
      </LiquidFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  scrollContent: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-5xl'],
    gap: spacing['Spacing-10xl'],
  },
  section: {
    gap: spacing['Spacing-xl'],
  },
  label: {
    ...typography.h0SemiBold,
    fontSize: moderateScale(16),
    color: colors.TextPrimaryDefault,
  },
  textArea: {
    minHeight: moderateScale(100),
  },
  suggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing['Spacing-l'],
    marginTop: spacing['Spacing-xs'],
  },
  suggestionPill: {
    paddingHorizontal: spacing['Spacing-xl'],
    paddingVertical: spacing['Spacing-m'],
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(4),
  },
  suggestionText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(8),
    padding: spacing['Spacing-xs'],
  },
  typeButton: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    alignItems: 'center',
    borderRadius: moderateScale(6),
  },
  typeButtonActive: {
    backgroundColor: colors.StatesWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  typeButtonText: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  typeButtonTextActive: {
    color: colors.TextPrimaryDefault,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
  },
  cardTitle: {
    ...typography.b1SemiBold,
    color: colors.TextPrimaryDefault,
  },
  cardSubtitle: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryHover,
  },
  frequencyTabs: {
    flexDirection: 'row',
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(4),
    padding: spacing['Spacing-xs'],
  },
  freqButton: {
    flex: 1,
    paddingVertical: spacing['Spacing-xl'],
    alignItems: 'center',
    borderRadius: moderateScale(4),
  },
  freqButtonActive: {
    backgroundColor: colors.StatesWhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.StatesOutline,
  },
  freqButtonText: {
    ...typography.bodySmall2Regular,
    color: colors.TextSecondaryDefault,
  },
  freqButtonTextActive: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  weeklyDaysSection: {
    gap: spacing['Spacing-xl'],
    marginTop: spacing['Spacing-xl'],
  },
  daySelectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayBubble: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: colors.StatesOutline,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.StatesWhite,
  },
  dayBubbleSelected: {
    backgroundColor: colors.PrimaryMain,
    borderColor: colors.PrimaryMain,
  },
  dayBubbleError: {
    borderColor: colors.FeedbackWarningBorder,
  },
  dayLabel: {
    ...typography.bodySmall2Medium,
    color: colors.TextSecondaryDefault,
  },
  dayLabelSelected: {
    color: colors.StatesWhite,
  },
  errorText: {
    ...typography.bodySmall3Medium,
    color: colors.FeedbackWarningText,
    marginTop: spacing['Spacing-xs'],
  },
  repeatSummaryText: {
    ...typography.bodySmall2Medium,
    color: colors.TextPrimaryDefault,
  },
  repeatSummaryDays: {
    color: colors.TextSecondaryHover,
    ...typography.bodySmall2Regular,
  },
  reminderCard: {
    gap: spacing['Spacing-5xl'],
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timePickerContainer: {
    alignItems: 'center',
    gap: spacing['Spacing-m'],
    marginTop: spacing['Spacing-xl'],
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-8xl'],
    width: moderateScale(160),
    justifyContent: 'center',
  },
  timeRowActive: {
    paddingVertical: spacing['Spacing-xs'],
  },
  timeTextActive: {
    ...typography.b1Medium,
    color: colors.TextPrimaryDefault,
    width: moderateScale(30),
    textAlign: 'center',
  },
  timeTextFaded: {
    ...typography.b1Medium,
    color: colors.TextSecondaryDisabled,
    width: moderateScale(30),
    textAlign: 'center',
    opacity: 0.3,
  },
  periodPlaceholder: {
    width: moderateScale(30),
  },
  summaryCard: {
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: moderateScale(8),
    padding: spacing['Spacing-5xl'],
    gap: spacing['Spacing-xl'],
  },
  summaryTitle: {
    ...typography.bodySmall1SemiBold,
    color: colors.TextSecondaryDefault,
    marginBottom: spacing['Spacing-xs'],
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
  },
  summaryText: {
    ...typography.bodySmall1Medium,
    color: colors.TextPrimaryDefault,
  },
});
