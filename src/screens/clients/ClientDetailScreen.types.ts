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
