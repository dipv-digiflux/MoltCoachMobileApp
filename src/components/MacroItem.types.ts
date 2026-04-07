import { ViewStyle } from 'react-native';

export interface MacroItemCompProps {
  label: string;
  current: string | number;
  target: string | number;
  status: string;
  statusColor: string;
  containerStyle?: ViewStyle;
}
