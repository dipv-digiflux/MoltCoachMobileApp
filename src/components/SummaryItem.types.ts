import { TextStyle, ViewStyle } from 'react-native';

export interface SummaryItemProps {
  value: string | number;
  label: string;
  containerStyle?: ViewStyle;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
}
