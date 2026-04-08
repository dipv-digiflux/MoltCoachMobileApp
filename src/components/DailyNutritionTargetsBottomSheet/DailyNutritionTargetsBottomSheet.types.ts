import type { StyleProp, ViewStyle } from 'react-native';

import type { BottomSheetProps } from '@/types/bottomSheet.types';

export type NutritionPlan = 'Low carb' | 'High carb' | 'Balanced' | 'Custom';

export interface NutrientSliderProps {
  label: string;
  value: number;
  percent?: number;
  unit: string;
  recommendedValue: string;
  minValue: number;
  maxValue: number;
  onValueChange: (value: number) => void;
  isLocked?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  activePlan: NutritionPlan;
}

export interface DailyNutritionTargetsBottomSheetProps
  extends Omit<BottomSheetProps, 'children'> {
  onReset?: () => void;
  onSaveChanges?: (data: NutritionData) => void;
}
