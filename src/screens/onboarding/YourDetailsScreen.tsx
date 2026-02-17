import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
import { Keyboard, Pressable, StyleSheet, Text, View } from 'react-native';
import {
  isLiquidGlassSupported,
  LiquidGlassView,
} from '@callstack/liquid-glass';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CalendarIconSvg, ChevronDownIconSvg } from '@/assets/images';
import {
  Button,
  Input,
  PageHeaderScrollView,
  ProgressStepper,
  Radio,
} from '@/components';
import { OnboardingNavigationProp } from '@/navigation/types';
import { colors, iconScale, moderateScale, spacing, typography } from '@/theme';

// ─── Types ───────────────────────────────────────────────────────────

type Sex = 'female' | 'male' | 'other';
type DailyActivity = 'high-output' | 'get-stronger' | 'moderate-activity';
type PrimaryGoal = 'build-muscle' | 'burn-fat' | 'performance';
type ChronicCondition =
  | 'joint-issues'
  | 'cardiovascular'
  | 'respiratory'
  | 'nothing';

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
  { value: 'high-output', label: 'High Output' },
  { value: 'get-stronger', label: 'Get Stronger' },
  { value: 'moderate-activity', label: 'Moderate Activity' },
];

const PRIMARY_GOAL_OPTIONS: SelectionOption<PrimaryGoal>[] = [
  { value: 'build-muscle', label: 'Build Muscle' },
  { value: 'burn-fat', label: 'Burn Fat' },
  { value: 'performance', label: 'Performance' },
];

const CHRONIC_CONDITION_OPTIONS: SelectionOption<ChronicCondition>[] = [
  { value: 'joint-issues', label: 'Joint Issues' },
  { value: 'cardiovascular', label: 'Cardiovascular' },
  { value: 'respiratory', label: 'Respiratory' },
  { value: 'nothing', label: 'Nothing' },
];

// ─── Icon sizes ──────────────────────────────────────────────────────

const ICON_SIZE = iconScale(24);

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
  // ── Form state ────────────────────────────────────────────────────
  const [sex, setSex] = useState<Sex | undefined>(undefined);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dailyActivity, setDailyActivity] = useState<DailyActivity | undefined>(
    undefined,
  );
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal | undefined>(
    undefined,
  );
  const [chronicCondition, setChronicCondition] = useState<
    ChronicCondition | undefined
  >(undefined);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // ── Handlers ──────────────────────────────────────────────────────
  const handleNext = useCallback((): void => {
    navigation.navigate('ConnectHealth');
  }, []);

  const footerBottom = useMemo((): number => {
    const offset = Math.max(insets.bottom, spacing['Spacing-10xl']);
    const keyboardGap = spacing['Spacing-5xl'];
    return offset + keyboardHeight + (keyboardHeight > 0 ? keyboardGap : 0);
  }, [insets.bottom, keyboardHeight]);

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

  // ── Render ────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <PageHeaderScrollView
        header={{ title: 'Your details' }}
        headerChildren={<ProgressStepper currentStep={1} totalSteps={2} />}
        contentContainerStyle={{
          paddingBottom:
            spacing['Spacing-15xl'] + spacing['Spacing-10xl'] + insets.bottom,
        }}
      >
        {/* ── Description ─────────────────────────────────────── */}
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            Accurate metrics help us calculate your personalized fitness plan
            and daily targets.
          </Text>
        </View>

        {/* ── Sex ─────────────────────────────────────────────── */}
        <View style={styles.sectionFirst}>
          <Text style={styles.sectionLabel}>Sex</Text>
          <View style={styles.sexRow}>
            {SEX_OPTIONS.map(option => (
              <Radio
                key={option.value}
                selected={sex === option.value}
                onPress={() => setSex(option.value)}
                label={option.label}
                size="small"
              />
            ))}
          </View>
        </View>

        {/* ── Name ────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Name</Text>
          <Input
            placeholder="Type your name here"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* ── DOB ─────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Dob</Text>
          <Input
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={setDob}
            keyboardType="number-pad"
            rightIcon={<CalendarIconSvg width={ICON_SIZE} height={ICON_SIZE} />}
          />
        </View>

        {/* ── Height ──────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Height</Text>
          <Input
            placeholder="Enter height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            rightIcon={<UnitSuffix unit="Cm" />}
          />
        </View>

        {/* ── Weight ──────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Weight</Text>
          <Input
            placeholder="Enter weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            rightIcon={<UnitSuffix unit="Kg" />}
          />
        </View>

        {/* ── Daily Activity ──────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Daily Activity</Text>
          <View style={styles.chipGrid}>
            {DAILY_ACTIVITY_OPTIONS.map(option => (
              <SelectionChip
                key={option.value}
                label={option.label}
                selected={dailyActivity === option.value}
                onPress={() => setDailyActivity(option.value)}
              />
            ))}
          </View>
        </View>

        {/* ── Primary Goal ────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Primary Goal</Text>
          <View style={styles.chipGrid}>
            {PRIMARY_GOAL_OPTIONS.map(option => (
              <SelectionChip
                key={option.value}
                label={option.label}
                selected={primaryGoal === option.value}
                onPress={() => setPrimaryGoal(option.value)}
              />
            ))}
          </View>
        </View>

        {/* ── Chronic condition ────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Chronic condition</Text>
          <View style={styles.chipGrid}>
            {CHRONIC_CONDITION_OPTIONS.map(option => (
              <SelectionChip
                key={option.value}
                label={option.label}
                selected={chronicCondition === option.value}
                onPress={() => setChronicCondition(option.value)}
              />
            ))}
          </View>
        </View>
      </PageHeaderScrollView>

      {/* ── Sticky footer ────────────────────────────────────────── */}
      <LiquidGlassView style={footerStyle}>
        <Button label="Next" onPress={handleNext} style={styles.nextButton} />
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
