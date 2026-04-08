import React, { ReactElement, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

import { BottomSheet, Button, FilterTabs, InfoCard } from '@/components';
import { useAppSelector } from '@/store/hooks';
import { borderWidth, colors, radius, spacing, typography } from '@/theme';

import {
  type DailyNutritionTargetsBottomSheetProps,
  type NutritionPlan,
} from './DailyNutritionTargetsBottomSheet.types';
import { NutrientSlider } from './NutrientSlider';

const NUTRITION_PLANS: NutritionPlan[] = [
  'Low carb',
  'High carb',
  'Balanced',
  'Custom',
];

export const DailyNutritionTargetsBottomSheet = ({
  visible,
  onClose,
  onReset,
  onSaveChanges,
  ...rest
}: DailyNutritionTargetsBottomSheetProps): ReactElement => {
  const translation = useAppSelector(state => state.translation);
  const [activePlan, setActivePlan] = useState<NutritionPlan>('Custom');

  // Mock state for nutrients - in real app would come from props or redux
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(128);
  const [fat, setFat] = useState(110);
  const [carbs, setCarbs] = useState(132);

  const handleReset = useCallback(() => {
    if (onReset) onReset();
    // Default values
    setCalories(2000);
    setProtein(128);
    setFat(110);
    setCarbs(132);
  }, [onReset]);

  const handleSaveChanges = useCallback(() => {
    if (onSaveChanges) {
      onSaveChanges({ calories, protein, fat, carbs, activePlan });
    }
    onClose();
  }, [onSaveChanges, calories, protein, fat, carbs, activePlan, onClose]);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      header={{
        title: translation.dailyNutritionHeaderTitle,
        subtitle: translation.dailyNutritionHeaderSubtitle,
      }}
      footer={{
        children: (
          <Button
            label={translation.dailyNutritionSaveChangesButton}
            onPress={handleSaveChanges}
            variant="primary"
            style={styles.saveButton}
          />
        ),
      }}
      {...rest}
    >
      <View style={styles.container}>
        {/* Nutrition Plan Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {translation.dailyNutritionPlanTitle}
            </Text>
            <Pressable onPress={handleReset}>
              <Text style={styles.resetText}>
                {translation.dailyNutritionPlanReset}
              </Text>
            </Pressable>
          </View>
          <FilterTabs
            tabs={NUTRITION_PLANS}
            activeTab={activePlan}
            onTabChange={tab => setActivePlan(tab as NutritionPlan)}
            style={styles.filterTabs}
            variant="pill"
          />
        </View>

        {/* Sliders Section */}
        <View style={styles.slidersContainer}>
          <NutrientSlider
            label={translation.dailyNutritionCaloriesLabel}
            value={calories}
            unit={translation.dailyNutritionKcalUnit}
            recommendedValue="2,342 KCal"
            minValue={1000}
            maxValue={4000}
            onValueChange={setCalories}
            isLocked={true}
          />

          <NutrientSlider
            label={translation.dailyNutritionProteinLabel}
            value={protein}
            percent={40}
            unit={translation.dailyNutritionGramUnit}
            recommendedValue="50g- 75g"
            minValue={0}
            maxValue={300}
            onValueChange={setProtein}
          />

          <NutrientSlider
            label={translation.dailyNutritionFatLabel}
            value={fat}
            percent={32}
            unit={translation.dailyNutritionGramUnit}
            recommendedValue="50g- 75g"
            minValue={0}
            maxValue={200}
            onValueChange={setFat}
          />

          <NutrientSlider
            label={translation.dailyNutritionCarbsLabel}
            value={carbs}
            percent={46}
            unit={translation.dailyNutritionGramUnit}
            recommendedValue="50g- 75g"
            minValue={0}
            maxValue={500}
            onValueChange={setCarbs}
          />
        </View>

        {/* Info Box */}
        <InfoCard
          description="Text here"
          variant="simple"
          style={styles.infoCard}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing['Spacing-3xl'],
    paddingBottom: spacing['Spacing-3xl'],
    gap: spacing['Spacing-10xl'],
  },
  section: {
    gap: spacing['Spacing-5xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.b1SemiBold,
    color: colors.PrimaryMain,
  },
  resetText: {
    ...typography.bodySmall1Regular,
    color: colors.TextSecondaryDefault,
  },
  filterTabs: {
    marginHorizontal: 0,
    backgroundColor: colors.SurfaceSecondaryDefault,
    borderRadius: radius.xs,
    paddingHorizontal: spacing['Spacing-m'],
    paddingVertical: spacing['Spacing-m'],
  },
  slidersContainer: {
    gap: spacing['Spacing-5xl'],
  },
  infoCard: {
    marginTop: spacing['Spacing-m'],
    marginBottom: spacing['Spacing-3xl'],
    backgroundColor: colors.SurfacePrimaryDefault,
    borderWidth: borderWidth.hairline,
    borderColor: colors.BorderPrimaryDisabled,
    borderRadius: radius.xs,
  },
  saveButton: {
    width: '100%',
    backgroundColor: colors.PrimaryMain,
    borderRadius: radius.xs,
  },
});
