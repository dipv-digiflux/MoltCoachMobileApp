export type Sex = 'male' | 'female' | 'other';

export type HeightUnit = 'cm' | 'ft';

export type WeightUnit = 'kg' | 'lbs';

export type DailyActivity =
  | 'High Output'
  | 'Get Stronger'
  | 'Moderate Activity'
  | 'Sedentary'
  | 'Lightly Active'
  | 'Athlete Mode';

export type PrimaryGoal =
  | 'Build Muscle'
  | 'Burn Fat'
  | 'Performance'
  | 'Maintain';

export type ChronicCondition =
  | 'Joint issues'
  | 'Cardiovascular'
  | 'Respiratory'
  | 'Nothing';

export interface OnboardingFormValues {
  name: string;
  sex: Sex;
  birthDate: string;
  height: string;
  heightUnit: HeightUnit;
  weight: string;
  weightUnit: WeightUnit;
  dailyActivity: DailyActivity;
  primaryGoal: PrimaryGoal;
  chronicCondition: ChronicCondition;
}
