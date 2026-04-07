import { ViewStyle } from 'react-native';

export interface StatusMessageProps {
  status: string;
  message: string;
  color?: string;
  containerStyle?: ViewStyle;
}
