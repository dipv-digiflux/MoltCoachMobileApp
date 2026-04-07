import { ViewStyle } from 'react-native';

export interface ActivityItemProps {
  type: string;
  time: string;
  value: string;
  subValue: string;
  containerStyle?: ViewStyle;
}
