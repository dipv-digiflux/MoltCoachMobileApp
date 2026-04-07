import { ViewStyle, ImageSourcePropType } from 'react-native';

export type MealStatusType = 'logged_molt' | 'logged_external' | 'not_logged';

export interface MealCardProps {
  name: string;
  kcal: number;
  macros: string;
  image?: string | ImageSourcePropType;
  status: string;
  statusType?: MealStatusType;
  tags?: string[];
  containerStyle?: ViewStyle;
}
