import { ViewStyle } from 'react-native';

export type StatusChipType = 'success' | 'warning' | 'neutral';

export interface StatusChipProps {
  label: string;
  type?: StatusChipType;
  containerStyle?: ViewStyle;
}
