import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import {
  Controller,
  type SubmitErrorHandler,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { postOnboarding } from '@/api/authApi';
import { CalendarIconSvg, ChevronDownIconSvg } from '@/assets/images';
import {
  Button,
  DateSelectionBottomSheet,
  Input,
  PageHeaderScrollView,
  ProgressStepper,
  Radio,
} from '@/components';
import { OnboardingNavigationProp } from '@/navigation/types';
import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';
import { showErrorToast } from '@/utils/toast';

import type { OnboardingRequest } from '@/types/api.types';
import type {
  ChronicCondition,
  DailyActivity,
  OnboardingFormValues,
  PrimaryGoal,
  Sex,
} from '@/types/onboarding.types';

type SelectionOption<T extends string> = {
  value: T;
  label: string;
};

// ─── Static option data ──────────────────────────────────────────────

const SEX_OPTIONS: SelectionOption<Sex>[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
];

const DAILY_ACTIVITY_OPTIONS: SelectionOption<DailyActivity>[] = [
  { value: 'High Output', label: 'High Output' },
  { value: 'Get Stronger', label: 'Get Stronger' },
  { value: 'Moderate Activity', label: 'Moderate Activity' },
  { value: 'Sedentary', label: 'Sedentary' },
  { value: 'Lightly Active', label: 'Lightly Active' },
  { value: 'Athlete Mode', label: 'Athlete Mode' },
];

const PRIMARY_GOAL_OPTIONS: SelectionOption<PrimaryGoal>[] = [
  { value: 'Build Muscle', label: 'Build Muscle' },
  { value: 'Burn Fat', label: 'Burn Fat' },
  { value: 'Performance', label: 'Performance' },
  { value: 'Maintain', label: 'Maintain' },
];

const CHRONIC_CONDITION_OPTIONS: SelectionOption<ChronicCondition>[] = [
  { value: 'Joint issues', label: 'Joint issues' },
  { value: 'Cardiovascular', label: 'Cardiovascular' },
  { value: 'Respiratory', label: 'Respiratory' },
  { value: 'Nothing', label: 'Nothing' },
];

// ─── Icon sizes ──────────────────────────────────────────────────────

const ICON_SIZE = iconScale(24);

// ─── Keyboard avoidance (see docs/keyboard-avoidance-and-scroll.md) ───

const SCROLL_TO_INPUT_OFFSET = 100;
const ANDROID_SCROLL_DELAY_MS = 300;

// ─── Validation schema ───────────────────────────────────────────────

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const yourDetailsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  sex: z.enum(['male', 'female', 'other']),
  birthDate: z
    .string()
    .min(1, 'Birth date is required')
    .regex(dateRegex, 'Birth date must be in DD/MM/YYYY format'),
  height: z
    .string()
    .min(1, 'Height is required')
    .refine(value => Number(value) > 0, {
      message: 'Height must be a positive number',
    }),
  weight: z
    .string()
    .min(1, 'Weight is required')
    .refine(value => Number(value) > 0, {
      message: 'Weight must be a positive number',
    }),
  dailyActivity: z.enum([
    'High Output',
    'Get Stronger',
    'Moderate Activity',
    'Sedentary',
    'Lightly Active',
    'Athlete Mode',
  ]),
  primaryGoal: z.enum(['Build Muscle', 'Burn Fat', 'Performance', 'Maintain']),
  chronicCondition: z.enum([
    'Joint issues',
    'Cardiovascular',
    'Respiratory',
    'Nothing',
  ]),
});

// ─── SelectionChip ───────────────────────────────────────────────────

type SelectionChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const SelectionChip = ({
  label,
  selected,
  onPress,
}: SelectionChipProps): ReactElement => (
  <Pressable
    style={[styles.chip, selected ? styles.chipSelected : styles.chipDefault]}
    onPress={onPress}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
  >
    <View pointerEvents="none">
      <Radio selected={selected} size="small" />
    </View>
    <Text
      style={[
        selected ? typography.bodySmall1Medium : typography.bodySmall1Regular,
        {
          color: selected
            ? colors.TextPrimaryDefault
            : colors.TextSecondaryDefault,
        },
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

// ─── UnitSuffix ──────────────────────────────────────────────────────

type UnitSuffixProps = {
  unit: string;
};

const UnitSuffix = ({ unit }: UnitSuffixProps): ReactElement => (
  <View style={styles.unitSuffix}>
    <Text style={[typography.bodySmall1Regular, styles.unitText]}>{unit}</Text>
    <ChevronDownIconSvg width={ICON_SIZE} height={ICON_SIZE} />
  </View>
);

// ─── Screen ──────────────────────────────────────────────────────────

export const YourDetailsScreen = (): ReactElement => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [
    isDateSelectionBottomSheetVisible,
    setIsDateSelectionBottomSheetVisible,
  ] = useState(false);
  // ── Form state ────────────────────────────────────────────────────
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<OnboardingFormValues>({
    resolver: zodResolver<OnboardingFormValues, unknown, OnboardingFormValues>(
      yourDetailsSchema,
    ),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      sex: 'male' as Sex,
      birthDate: '',
      height: '',
      weight: '',
      dailyActivity: 'High Output' as DailyActivity,
      primaryGoal: 'Build Muscle' as PrimaryGoal,
      chronicCondition: 'Nothing' as ChronicCondition,
    },
  });
  const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const sectionYRef = useRef<Record<number, number>>({});

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setAndroidKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setAndroidKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const scrollPaddingBottom =
    spacing['Spacing-15xl'] + spacing['Spacing-10xl'] + insets.bottom;
  const scrollContentPaddingBottom =
    scrollPaddingBottom +
    (Platform.OS === 'android' ? androidKeyboardHeight : 0);

  const scrollToFocusedInput = useCallback((sectionIndex: number): void => {
    const y = sectionYRef.current[sectionIndex];
    if (y === undefined) return;
    const scrollY = Math.max(0, y - SCROLL_TO_INPUT_OFFSET);
    const doScroll = (): void => {
      scrollRef.current?.scrollTo({ y: scrollY, animated: true });
    };
    if (Platform.OS === 'android') {
      setTimeout(doScroll, ANDROID_SCROLL_DELAY_MS);
    } else {
      doScroll();
    }
  }, []);

  const handleSubmitForm: SubmitHandler<
    OnboardingFormValues
  > = async values => {
    const heightNumber = Number(values.height);
    const weightNumber = Number(values.weight);

    if (Number.isNaN(heightNumber) || Number.isNaN(weightNumber)) {
      showErrorToast('Height and weight must be valid numbers.');
      return;
    }

    const payload: OnboardingRequest = {
      name: values.name.trim(),
      sex: values.sex,
      birth_date: values.birthDate,
      height: heightNumber,
      height_unit: 'cm',
      weight: weightNumber,
      weight_unit: 'kg',
      daily_activity: values.dailyActivity,
      primary_goal: values.primaryGoal,
      chronic_condition: values.chronicCondition,
    };

    try {
      const response = await postOnboarding(payload);
      console.log('response', response);
      if (response.status === true) {
        navigation.navigate('ConnectHealth');
      } else {
        showErrorToast(response.message);
      }
    } catch (error: unknown) {
      console.error(error);
      showErrorToast('Something went wrong. Please try again.');
    }
  };

  const handleFormError: SubmitErrorHandler<
    OnboardingFormValues
  > = errorMap => {
    if (errorMap.name) {
      scrollToFocusedInput(0);
      return;
    }
    if (errorMap.birthDate) {
      scrollToFocusedInput(1);
      return;
    }
    if (errorMap.height) {
      scrollToFocusedInput(2);
      return;
    }
    if (errorMap.weight) {
      scrollToFocusedInput(3);
    }
  };

  const footerBottom = useMemo((): number => {
    const offset = Math.max(insets.bottom, spacing['Spacing-10xl']);
    const keyboardGap = spacing['Spacing-5xl'];
    return (
      offset +
      (Platform.OS === 'android'
        ? androidKeyboardHeight + (androidKeyboardHeight > 0 ? keyboardGap : 0)
        : 0)
    );
  }, [insets.bottom, androidKeyboardHeight]);

  const footerStyle = useMemo(
    () => [
      styles.footer,
      {
        bottom: footerBottom,
        backgroundColor: isLiquidGlassSupported
          ? undefined
          : 'rgba(255, 255, 255, 0.6)',
      },
    ],
    [footerBottom],
  );

  const scrollView = (
    <PageHeaderScrollView
      ref={scrollRef}
      header={{ title: 'Your details' }}
      headerChildren={<ProgressStepper currentStep={1} totalSteps={2} />}
      contentContainerStyle={{
        paddingBottom: scrollContentPaddingBottom,
      }}
    >
      {/* ── Description ─────────────────────────────────────── */}
      <View style={styles.descriptionSection}>
        <Text style={styles.descriptionText}>
          Accurate metrics help us calculate your personalized fitness plan and
          daily targets.
        </Text>
      </View>

      {/* ── Sex ─────────────────────────────────────────────── */}
      <View style={styles.sectionFirst}>
        <Text style={styles.sectionLabel}>Sex</Text>
        <Controller
          control={control}
          name="sex"
          render={({ field: { value, onChange } }) => (
            <View style={styles.sexRow}>
              {SEX_OPTIONS.map(option => (
                <Radio
                  key={option.value}
                  selected={value === option.value}
                  onPress={() => onChange(option.value)}
                  label={option.label}
                  size="small"
                />
              ))}
            </View>
          )}
        />
        {errors.sex?.message && (
          <Text style={styles.errorText}>{errors.sex.message}</Text>
        )}
      </View>

      {/* ── Name ────────────────────────────────────────────── */}
      <View
        style={styles.section}
        onLayout={e => {
          sectionYRef.current[0] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder="Type your name here"
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
              onFocus={() => scrollToFocusedInput(0)}
              onBlur={onBlur}
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />
      </View>

      {/* ── DOB ─────────────────────────────────────────────── */}
      <View
        style={styles.section}
        onLayout={e => {
          sectionYRef.current[1] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>Dob</Text>
        <Controller
          control={control}
          name="birthDate"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder="DD/MM/YYYY"
              value={value}
              onChangeText={onChange}
              editable={false}
              keyboardType="number-pad"
              rightIcon={
                <CalendarIconSvg
                  onPress={() => setIsDateSelectionBottomSheetVisible(true)}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                />
              }
              onFocus={() => scrollToFocusedInput(1)}
              onBlur={onBlur}
              error={!!errors.birthDate}
              errorMessage={errors.birthDate?.message}
              // caretHidden
            />
          )}
        />
      </View>

      {/* ── Height ──────────────────────────────────────────── */}
      <View
        style={styles.section}
        onLayout={e => {
          sectionYRef.current[2] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>Height</Text>
        <Controller
          control={control}
          name="height"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder="Enter height"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              rightIcon={<UnitSuffix unit="Cm" />}
              onFocus={() => scrollToFocusedInput(2)}
              onBlur={onBlur}
              error={!!errors.height}
              errorMessage={errors.height?.message}
            />
          )}
        />
      </View>

      {/* ── Weight ──────────────────────────────────────────── */}
      <View
        style={styles.section}
        onLayout={e => {
          sectionYRef.current[3] = e.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionLabel}>Weight</Text>
        <Controller
          control={control}
          name="weight"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              placeholder="Enter weight"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              rightIcon={<UnitSuffix unit="Kg" />}
              onFocus={() => scrollToFocusedInput(3)}
              onBlur={onBlur}
              error={!!errors.weight}
              errorMessage={errors.weight?.message}
            />
          )}
        />
      </View>

      {/* ── Daily Activity ──────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Daily Activity</Text>
        <Controller
          control={control}
          name="dailyActivity"
          render={({ field: { value, onChange } }) => (
            <View style={styles.chipGrid}>
              {DAILY_ACTIVITY_OPTIONS.map(option => (
                <SelectionChip
                  key={option.value}
                  label={option.label}
                  selected={value === option.value}
                  onPress={() => onChange(option.value)}
                />
              ))}
            </View>
          )}
        />
        {errors.dailyActivity?.message && (
          <Text style={styles.errorText}>{errors.dailyActivity.message}</Text>
        )}
      </View>

      {/* ── Primary Goal ────────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Primary Goal</Text>
        <Controller
          control={control}
          name="primaryGoal"
          render={({ field: { value, onChange } }) => (
            <View style={styles.chipGrid}>
              {PRIMARY_GOAL_OPTIONS.map(option => (
                <SelectionChip
                  key={option.value}
                  label={option.label}
                  selected={value === option.value}
                  onPress={() => onChange(option.value)}
                />
              ))}
            </View>
          )}
        />
        {errors.primaryGoal?.message && (
          <Text style={styles.errorText}>{errors.primaryGoal.message}</Text>
        )}
      </View>

      {/* ── Chronic condition ────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Chronic condition</Text>
        <Controller
          control={control}
          name="chronicCondition"
          render={({ field: { value, onChange } }) => (
            <View style={styles.chipGrid}>
              {CHRONIC_CONDITION_OPTIONS.map(option => (
                <SelectionChip
                  key={option.value}
                  label={option.label}
                  selected={value === option.value}
                  onPress={() => onChange(option.value)}
                />
              ))}
            </View>
          )}
        />
        {errors.chronicCondition?.message && (
          <Text style={styles.errorText}>
            {errors.chronicCondition.message}
          </Text>
        )}
      </View>
      <DateSelectionBottomSheet
        visible={isDateSelectionBottomSheetVisible}
        onClose={() => {
          setIsDateSelectionBottomSheetVisible(false);
        }}
        onDateSelect={_date => {
          setIsDateSelectionBottomSheetVisible(false);
          setValue('birthDate', '01/01/1990');
        }}
        headerTitle="Select date"
        initialSelectedDate={
          typeof control._formValues?.birthDate === 'string'
            ? control._formValues.birthDate
            : undefined
        }
        stickyFooter={true}
      />
    </PageHeaderScrollView>
  );

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior="padding"
          keyboardVerticalOffset={insets.top}
        >
          {scrollView}
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.keyboardAvoid}>{scrollView}</View>
      )}
      <LiquidGlassView style={footerStyle}>
        <Button
          label="Next"
          onPress={(): void => {
            void handleSubmit(handleSubmitForm, handleFormError)();
          }}
          style={styles.nextButton}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </LiquidGlassView>
    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.StatesWhite,
  },
  keyboardAvoid: {
    flex: 1,
  },

  // ── Description ───────────────────────────────────────────────────
  descriptionSection: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingBottom: spacing['Spacing-2xl'],
  },
  descriptionText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },

  // ── Section shared ────────────────────────────────────────────────
  section: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingVertical: spacing['Spacing-10xl'],
    gap: spacing['Spacing-5xl'],
  },
  sectionFirst: {
    paddingHorizontal: spacing['Spacing-5xl'],
    paddingTop: spacing['Spacing-2xl'],
    paddingBottom: spacing['Spacing-10xl'],
    gap: spacing['Spacing-5xl'],
  },
  sectionLabel: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },

  // ── Sex row ───────────────────────────────────────────────────────
  sexRow: {
    flexDirection: 'row',
    gap: spacing['Spacing-5xl'],
  },

  // ── Chip grid ─────────────────────────────────────────────────────
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing['Spacing-2xl'],
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing['Spacing-xl'],
    padding: spacing['Spacing-3xl'],
    borderWidth: 1,
    borderRadius: moderateScale(2),
    backgroundColor: colors.StatesWhite,
  },
  chipDefault: {
    borderColor: colors.BorderPrimaryDisabled,
  },
  chipSelected: {
    borderColor: colors.PrimaryMain,
  },

  // ── Unit suffix ───────────────────────────────────────────────────
  unitSuffix: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing['Spacing-xl'],
  },
  unitText: {
    color: colors.TextPrimaryDefault,
  },

  // ── Error text ─────────────────────────────────────────────────────
  errorText: {
    ...typography.bodySmall1Regular,
    color: colors.FeedbackWarningText,
  },

  // ── Footer ────────────────────────────────────────────────────────
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: spacing['Spacing-10xl'],
    paddingHorizontal: spacing['Spacing-5xl'],
  },
  nextButton: {
    alignSelf: 'stretch',
  },
});
