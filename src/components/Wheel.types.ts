import type { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface WheelProps {
  data: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  width?: number;
  itemHeight?: number;
  containerStyle?: StyleProp<ViewStyle>;
  itemTextStyle?: StyleProp<TextStyle>;
  activeItemTextStyle?: StyleProp<TextStyle>;
}
