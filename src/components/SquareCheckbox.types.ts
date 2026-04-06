import type { ViewStyle } from 'react-native';

export interface SquareCheckboxProps {
  checked: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}
