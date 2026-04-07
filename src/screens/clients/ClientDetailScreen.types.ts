import type {
  AppStackNavigationProp,
  AppStackParamList,
} from '@/types/navigation.types';
import type { RouteProp } from '@react-navigation/native';

export interface ClientDetailScreenProps {
  navigation: AppStackNavigationProp;
  route: RouteProp<AppStackParamList, 'ClientDetail'>;
}

export interface TaskData {
  name: string;
  description: string;
  completed: boolean;
}
export interface NutritionDayLogMeal {
  id: string;
  name: string;
  kcal: number;
  macros: string;
  status: string;
  statusType: string;
  tags: string[];
  image: unknown;
}

export interface NutritionDayLog {
  id: string;
  date: string;
  kcal: number;
  kcalTarget: number;
  pro: number;
  proTarget: number;
  carbs: number;
  carbsTarget: number;
  fat: number;
  fatTarget: number;
  meals: NutritionDayLogMeal[];
}
