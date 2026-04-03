import type { StyleProp, ViewStyle } from 'react-native';

export interface TaskItemProps {
  name: string;
  description: string;
  completed: boolean;
  onToggle?: (completed: boolean) => void;
  style?: StyleProp<ViewStyle>;
}
